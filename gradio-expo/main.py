import gradio as gr

def sentiment_analysis(text):

    if "happy" in text.lower():
        return "Pozitif"
    elif "sad" in text.lower():
        return "Negatif"
    else:
        return "Nötr"

iface = gr.Interface(fn=sentiment_analysis, inputs="text", outputs="text")
iface.launch(app_kwargs={"docs_url": "/docs","redoc_url": "/redoc"})
