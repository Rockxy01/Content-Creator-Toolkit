import requests
from nltk.tokenize import word_tokenize, sent_tokenize
import random
import markdown

# Initialize NLTK (download required resources if needed)
import nltk
nltk.download('punkt')

def summarize_text(text):
    sentences = sent_tokenize(text)
    return ' '.join(sentences[:2])  # Return the first two sentences as a summary

def check_plagiarism(text):
    return "Plagiarism check not implemented."

def format_markdown(markdown_text):
    return markdown.markdown(markdown_text)

def get_random_quote():
    quotes = [
        ("The best way to predict the future is to invent it.", "Alan Kay"),
        ("Life is 10% what happens to us and 90% how we react to it.", "Charles R. Swindoll"),
        ("The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"),
    ]
    return random.choice(quotes)

def count_words(text):
    words = word_tokenize(text)
    return {
        "words": len(words),
        "characters": len(text),
        "sentences": len(sent_tokenize(text))
    }
