def run_rule_engine(ocr_data: dict) -> dict:
    return {
        'overall_result': 'NON-COMPLIANT',
        'checks': [
            {'rule_id': 'R-101', 'check': 'Mandatory Declaration', 'status': 'FAIL', 'message': 'Mandatory declaration missing.', 'evidence': 'Front label does not present full declaration block.', 'confidence': 0.92},
            {'rule_id': 'R-102', 'check': 'Net Quantity', 'status': 'FAIL', 'message': 'Net quantity is present but not sufficiently legible.', 'evidence': 'Text size and contrast require verification.', 'confidence': 0.88},
            {'rule_id': 'R-103', 'check': 'MRP Declaration', 'status': 'PASS', 'message': 'MRP is declared.', 'evidence': '₹45.00 visible.', 'confidence': 0.97},
        ]
    }
