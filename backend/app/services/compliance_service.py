def run_rule_engine(ocr_data: dict) -> dict:
    checks = []
    
    # 1. Product Name
    if ocr_data.get('product_name'):
        checks.append({'rule_id': 'R-01', 'check': 'Generic Name of Commodity', 'status': 'PASS', 'message': 'Product name found', 'evidence': ocr_data['product_name']})
    else:
        checks.append({'rule_id': 'R-01', 'check': 'Generic Name of Commodity', 'status': 'FAIL', 'message': 'Product name missing', 'evidence': 'Not found in OCR data'})

    # 2. Manufacturer
    if ocr_data.get('manufacturer') and ocr_data.get('place_of_manufacture'):
        checks.append({'rule_id': 'R-02', 'check': 'Manufacturer Name & Address', 'status': 'PASS', 'message': 'Manufacturer details found', 'evidence': f"{ocr_data['manufacturer']}, {ocr_data['place_of_manufacture']}"})
    else:
        checks.append({'rule_id': 'R-02', 'check': 'Manufacturer Name & Address', 'status': 'FAIL', 'message': 'Manufacturer or address missing', 'evidence': 'Not found in OCR data'})

    # 3. Net Quantity
    if ocr_data.get('net_quantity'):
        checks.append({'rule_id': 'R-03', 'check': 'Net Quantity', 'status': 'PASS', 'message': 'Net quantity found', 'evidence': ocr_data['net_quantity']})
    else:
        checks.append({'rule_id': 'R-03', 'check': 'Net Quantity', 'status': 'FAIL', 'message': 'Net quantity missing', 'evidence': 'Not found in OCR data'})

    # 4. MRP
    if ocr_data.get('mrp'):
        checks.append({'rule_id': 'R-04', 'check': 'MRP Declaration', 'status': 'PASS', 'message': 'MRP found', 'evidence': ocr_data['mrp']})
    else:
        checks.append({'rule_id': 'R-04', 'check': 'MRP Declaration', 'status': 'FAIL', 'message': 'MRP missing', 'evidence': 'Not found in OCR data'})
        
    # 5. Manufacturing Date
    if ocr_data.get('manufacturing_date'):
        checks.append({'rule_id': 'R-05', 'check': 'Month & Year of Manufacture', 'status': 'PASS', 'message': 'Manufacturing date found', 'evidence': ocr_data['manufacturing_date']})
    else:
        checks.append({'rule_id': 'R-05', 'check': 'Month & Year of Manufacture', 'status': 'FAIL', 'message': 'Manufacturing date missing', 'evidence': 'Not found in OCR data'})
        
    # 6. Consumer Care
    if ocr_data.get('consumer_care'):
        checks.append({'rule_id': 'R-06', 'check': 'Consumer Care Details', 'status': 'PASS', 'message': 'Consumer care details found', 'evidence': ocr_data['consumer_care']})
    else:
        checks.append({'rule_id': 'R-06', 'check': 'Consumer Care Details', 'status': 'FAIL', 'message': 'Consumer care missing', 'evidence': 'Not found in OCR data'})

    overall = 'COMPLIANT' if all(c['status'] == 'PASS' for c in checks) else 'NON-COMPLIANT'
    
    return {
        'overall_result': overall,
        'checks': checks
    }
