def build_report(scan_id: str, compliance_result: dict) -> dict:
    return {
        'report_id': f'report-{scan_id}',
        'scan_id': scan_id,
        'title': 'METROLOGY COMPLIANCE REPORT',
        'product': 'Wheat Flour',
        'manufacturer': 'ABC Foods Pvt Ltd',
        'submission_date': '24/05/2025',
        'compliance_checks': compliance_result.get('checks', []),
        'recommendation': 'Recommend clarification before approval.',
        'decision': 'Needs Official Review'
    }
