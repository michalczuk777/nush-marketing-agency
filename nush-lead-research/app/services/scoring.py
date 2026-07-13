def calculate_score(company, analysis, emails):
    points, reasons = 0, []
    if analysis and analysis.ecommerce_detected: points += 15; reasons.append('+15 E-commerce wykryty')
    elif analysis and analysis.catalog_detected: points += 10; reasons.append('+10 Rozbudowany katalog')
    if analysis and analysis.product_url_estimate:
        if analysis.product_url_estimate >= 500: points += 15; reasons.append('+15 Ponad 500 URL-i produktowych')
        elif analysis.product_url_estimate >= 100: points += 10; reasons.append('+10 100–499 URL-i produktowych')
        elif analysis.product_url_estimate >= 20: points += 5; reasons.append('+5 20–99 URL-i produktowych')
    if analysis:
        if not analysis.title or not analysis.meta_description: points += 5; reasons.append('+5 Brak poprawnego title/meta')
        if not analysis.viewport_present: points += 5; reasons.append('+5 Brak viewportu')
    preferred = next((e for e in emails if e.preferred and not e.excluded), None)
    if preferred: points += 10; reasons.append('+10 Publiczny firmowy adres funkcyjny')
    if company.phone: points += 5; reasons.append('+5 Publiczny numer telefonu')
    if company.status.upper() == 'SUSPENDED': points -= 20; reasons.append('-20 Działalność zawieszona')
    if company.status.upper() == 'ENDED': points -= 100; reasons.append('-100 Działalność zakończona')
    return max(0, min(100, points)), reasons
