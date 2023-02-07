import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForSequenceClassification
import numpy as np
import nltk
import matplotlib.pyplot as plt

from krwordrank.word import KRWordRank

def summary_model(text): # 요약 모델
    nltk.download('punkt')

    model = AutoModelForSeq2SeqLM.from_pretrained('eenzeenee/t5-base-korean-summarization')
    tokenizer = AutoTokenizer.from_pretrained('eenzeenee/t5-base-korean-summarization')
    prefix = "summarize: "

    inputs = [prefix + text]
    inputs = tokenizer(inputs, max_length=512, truncation=True, return_tensors="pt")
    output = model.generate(**inputs, num_beams=3, do_sample=True, min_length=10, max_length=100)
    decoded_output = tokenizer.batch_decode(output, skip_special_tokens=True)[0]
    return nltk.sent_tokenize(decoded_output.strip())[0]

def emo_model(temp): # 감정 추출 모델
    tokenizer_emo = AutoTokenizer.from_pretrained(
    'nlp04/korean_sentiment_analysis_dataset3',   # or float32 version: revision=KoGPT6B-ryan1.5b
    bos_token='[BOS]', eos_token='[EOS]', unk_token='[UNK]', pad_token='[PAD]', mask_token='[MASK]'
    )
    model_emo = AutoModelForSequenceClassification.from_pretrained(
    'nlp04/korean_sentiment_analysis_dataset3',  # or float32 version: revision=KoGPT6B-ryan1.5b
    )
    _ = model_emo.eval()

    with torch.no_grad():
        tokens = tokenizer_emo.encode(temp, return_tensors='pt')
        output = model_emo(tokens)
    
    #전처리
    return output.logits.tolist()[0]

def keyword_model(text): #키워드 추출 모델
    min_count = 2   # 단어의 최소 출현 빈도수 (그래프 생성 시)
    max_length = 10 # 단어의 최대 길이
    wordrank_extractor = KRWordRank(min_count=min_count, max_length=max_length)
    beta = 0.85    # PageRank의 decaying factor beta
    max_iter = 10
    texts = []
    texts.append(text)
    keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter)
    
    key_list = []
    for word, r in sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:30]:
            key_list.append(word)
    
    key_list = key_list[:10]
    return key_list

def model_visualization(iplist):
    emotion = ['neutrality', 'happiness', 'Embarrassment','anger','unrest','sadness','aversion']
    plt.figure(figsize=(11,8))
    plt.bar(emotion, iplist, width=0.3)
    plt.savefig('./static/image/analyzeresult.png')