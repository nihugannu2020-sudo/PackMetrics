def generate_explanation(question: str, context: dict | None = None) -> dict:
    return {
        'answer': 'The package appears to have missing or unclear mandatory declarations. This is a preliminary AI-assisted explanation and should be reviewed by the authorized government official.',
        'grounded_rules': ['Rule 6(1)', 'Rule 6(2)'],
        'confidence': 0.91,
        'source_context': context or {}
    }
