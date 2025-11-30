from ..sentiment import analyze_sentiment

def test_sentiment():
    result = analyze_sentiment("I love this project!")
    assert result["sentiment"] == "Positive"
    
    result2 = analyze_sentiment("The weather is bad today.")
    assert result2["sentiment"] == "Negative"
