import nltk
try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon')

from nltk import sent_tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer

def analyze_sentiment(text, threshold=0.2):
    analyzer = SentimentIntensityAnalyzer()

    scores = analyzer.polarity_scores(text)

    sentences = sent_tokenize(text)
    comp_scores = [analyzer.polarity_scores(s)['compound'] for s in sentences]
    avg_score = sum(comp_scores) / len(comp_scores)

    sentiment = ''
    if avg_score >= threshold:
        sentiment = "Positive"
    elif avg_score <= -threshold:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return {
        'negative': scores['neg'], 
        'positive': scores['pos'], 
        'compound': avg_score,
        'sentiment': sentiment
    }