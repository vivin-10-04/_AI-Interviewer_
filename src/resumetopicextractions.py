from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import json
import math
import os
from collections import Counter
import re
from dotenv import load_dotenv
from textblob import TextBlob

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    text = spell_check(text)
    text = remove_url(text)
    text = remove_dates(text)
    return text

def spell_check(text):
    for word in text:
        TextBlob(word).correct()
def remove_url(text):
    pattern = re.compile(r'https?://\S+|www\.\S+')
    return pattern.sub(r'', text)

def common_words(text):
    words = {
        "linkedin" , "github" , "leetcode" , "codechef" , "codeforces" , "mail" , "gmail" 
    }

def remove_dates(text):
     
    date_patterns = [
        r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b',      
        r'\b\d{4}[/-]\d{1,2}[/-]\d{1,2}\b',        
        r'\b\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s\d{2,4}\b',   
        r'\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s\d{1,2},?\s\d{2,4}\b',  
        r'\b\d{1,2}(st|nd|rd|th)?\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s\d{2,4}\b'  
    ]
    
    for pattern in date_patterns:
        text = re.sub(pattern, '', text, flags=re.IGNORECASE)
    
    return text

def compute_tf(words):
    tf = {}
    count = Counter(words)
    total = len(words)
    for word, freq in count.items():
        tf[word] = freq / total
    return tf

def compute_idf(documents):
    idf = {}
    total_docs = len(documents)
    all_words = set(word for doc in documents for word in doc)
    for word in all_words:
        doc_count = sum(1 for doc in documents if word in doc)
        idf[word] = math.log(total_docs / (1 + doc_count))
    return idf

def compute_tfidf(documents):
    tokenized = [preprocess(doc) for doc in documents]
    idf = compute_idf(tokenized)
    results = []
    for i, words in enumerate(tokenized):
        tf = compute_tf(words)
        tfidf_scores = {}
        for word, tf_val in tf.items():
            tfidf_scores[word] = round(tf_val * idf[word], 6)
        results.append(tfidf_scores)
    return results

def get_top_tfidf(tfidf_scores, top_n=10):
    if isinstance(tfidf_scores, list):
        tfidf_scores = tfidf_scores[0]
    sorted_scores = sorted(tfidf_scores.items(), key=lambda x: x[1], reverse=True)
    return dict(sorted_scores[:top_n])

# documents must be a list
documents = ["""Web3 Solana Web Token Mint App: Built a frontend application to Mint your own Solana Blockchain Crypto token on
the Devnet. Also you can send it to any Web3 Wallet. Tech used- Web3.js library, NextJS, TypeScript.
• Blogging App: (Work in progress) Built a Full Stack MERN Blogging Website with Custom self created Authentication.
Created Restful APIs using HONO hosted on Cloudflare Workers for seemless frontend, backend and Database communication.
Technologies used- Typescript, Hono, React, Cloudflare workers, Prisma ORM, and PostgreSQL.
• Redis Pubsub with Node.JS and React.JS: Developed a Node.js Websocket server which subscribes to a Redis PubSub
and then whenever Redis publishes on the PubSub, the Node.JS Websocket server broadcasts the same to every Frontend
client connected to the Node.js WebSocket server.
• Full Stack Wallet App: Developed a Full Stack MERN Wallet Application similar to PayTM with custom Authentication,
ZOD input validations, used DB transactions to stop payment if transaction request fails. Tech Used- NodeJS, ReactJS,
MongoDB, JavaScript, JSON Web Tokens(JWT), and Zod
• Portfolio Website: Developed my own SEO optimized Portfolio website using NextJS Framework, typescript, ShadCN UI,
Prisma ORM, PostgreSQL. Integrated a “Feedback” feature for visitors to provide inputs and rate my website using Next
”Server side rendering” . 
• MERN Todo Application: Developed a Full Stack Dynamic MERN Todo Application. Tech used – ReactJS, Node.JS,
MongoDB
• CI/CD Setup on GCP: Continuous Integration using Github and Continous Deployment using GCP Cloud Run for
deploying containers. Tech used- Docker, Google Cloud Run and Github. 
• Minigrep CLI Program using Rust: Developed a basic CLI Program similar to ’grep’ using Rust programming language."""]



def get_name():
    count = 0
    while os.path.exists(f"resume topic{count}.txt"):
        count += 1
    return f"resume topic{count}.txt"

def topic(resume):
    tfidfres = compute_tfidf(documents)
    tfidfres1 = get_top_tfidf(tfidfres, top_n=10)

    llm = ChatGroq(
        groq_api_key=GROQ_API_KEY,
        model_name="openai/gpt-oss-20b",  
        temperature=0.7
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert resume analyzer.
Given a resume and TF-IDF keyword scores, extract the topics. Give more weight to technologies that are rare and new , also list these seperatly than the vast/umbrella topics.
Return ONLY a valid JSON array like this, no explanation, no markdown:
[
  {{"topic": String, "importance": float}}
]"""),
        ("human", "Resume:\n{resume} \n\nTF-IDF Scores:\n{tfidfsc}")
    ])

    chain = prompt | llm | StrOutputParser()

    raw = chain.invoke({"resume": resume, "tfidfsc": tfidfres1})

     
    raw = raw.strip()
    if raw.startswith("```"):
        raw = re.sub(r"```(?:json)?", "", raw).strip().strip("```").strip()

    try:
        result = json.loads(raw)
    except json.JSONDecodeError:
        print("Could not parse JSON, saving raw output.")
        result = raw

     
    output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Doc\resume_topics')
    os.makedirs(output_dir, exist_ok=True)
    filepath = os.path.join(output_dir, get_name())

    with open(filepath, "w") as f:
        if isinstance(result, str):
            f.write(result)
        else:
            f.write(json.dumps(result, indent=2))

    print(f"Saved to {filepath}")
    print(json.dumps(result, indent=2) if not isinstance(result, str) else result)
