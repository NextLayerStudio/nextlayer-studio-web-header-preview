#!/bin/bash

# Insert Czech e-shop translations after line 1008
sed -i '' '1009i\
    // E-shop service page\
    '"'"'eshop.title'"'"': '"'"'Tvorba e-shopu'"'"',\
    '"'"'eshop.subtitle'"'"': '"'"'Vaše cesta k úspěšnému online prodeji'"'"',\
    '"'"'eshop.simpleAdmin'"'"': '"'"'Jednoduchá administrace'"'"',\
    '"'"'eshop.simpleAdminDesc'"'"': '"'"'Váš e-shop bude mít intuitivní administrační panel, který vám umožní jednoduše spravovat produkty, objednávky a zákazníky. Automatizované e-mailové notifikace vám ušetří čas a všechno bude pod kontrolou.'"'"',\
    '"'"'eshop.serviceIntegration'"'"': '"'"'Integrace služeb'"'"',\
    '"'"'eshop.serviceIntegrationDesc'"'"': '"'"'Propojíme váš e-shop s externími službami, které vám usnadní podnikání. Ať už jde o platební brány jako Stripe a PayPal, analytické nástroje nebo logistické služby. Všechno pro vaše pohodlí a efektivní podnikání.'"'"',\
    '"'"'eshop.technologies'"'"': '"'"'Používané technologie'"'"',\
    '"'"'eshop.frontend'"'"': '"'"'Frontend'"'"',\
    '"'"'eshop.backend'"'"': '"'"'Backend'"'"',\
    '"'"'eshop.ecommerceFunctions'"'"': '"'"'E-commerce funkce'"'"',\
    '"'"'eshop.securityPerformance'"'"': '"'"'Bezpečnost a výkon'"'"',\
    '"'"'eshop.seoMarketing'"'"': '"'"'SEO a marketing'"'"',\
    '"'"'eshop.paymentGateways'"'"': '"'"'Platební brány'"'"',\
    '"'"'eshop.orderManagement'"'"': '"'"'Správa objednávek'"'"',\
    '"'"'eshop.productManagement'"'"': '"'"'Správa produktů'"'"',\
    '"'"'eshop.userAccounts'"'"': '"'"'Uživatelské účty'"'"',\
    '"'"'eshop.httpsSSL'"'"': '"'"'HTTPS a SSL'"'"',\
    '"'"'eshop.attackProtection'"'"': '"'"'Ochrana před útoky'"'"',\
    '"'"'eshop.fastLoading'"'"': '"'"'Rychlé načítání'"'"',\
    '"'"'eshop.scalability'"'"': '"'"'Škálovatelnost'"'"',\
    '"'"'eshop.seoOptimization'"'"': '"'"'SEO optimalizace'"'"',\
    '"'"'eshop.analyticsTools'"'"': '"'"'Analytické nástroje'"'"',\
    '"'"'eshop.emailMarketing'"'"': '"'"'Email marketing'"'"',\
    '"'"'eshop.socialNetworks'"'"': '"'"'Sociální sítě'"'"',\
    '"'"'eshop.ctaTitle'"'"': '"'"'Chcete vědět více?'"'"',\
    '"'"'eshop.ctaDescription'"'"': '"'"'Kontaktujte nás a společně najdeme to nejlepší řešení pro váš online obchod.'"'"',\
    '"'"'eshop.ctaButton'"'"': '"'"'Kontaktovat nás'"'"',\
    '"'"'eshop.successfulEshops'"'"': '"'"'Naše úspěšné e-shopy'"'"',\
    '"'"'eshop.successfulEshopsDesc'"'"': '"'"'Podívejte se na naše nejúspěšnější projekty. Každý e-shop je příběh úspěchu, který pomohl našim klientům růst v digitálním světě.'"'"',\
    '"'"'eshop.fashionEshop'"'"': '"'"'Módní e-shop'"'"',\
    '"'"'eshop.fashionCategory'"'"': '"'"'Móda a doplňky'"'"',\
    '"'"'eshop.fashionDesc'"'"': '"'"'Moderní e-shop s pokročilými funkcemi pro módní značku. Implementovali jsme personalizovaná doporučení a AI-powered vyhledávání.'"'"',\
    '"'"'eshop.electronicsEshop'"'"': '"'"'Elektronika'"'"',\
    '"'"'eshop.electronicsCategory'"'"': '"'"'Elektronika a gadgets'"'"',\
    '"'"'eshop.electronicsDesc'"'"': '"'"'Kompletní e-shop s propojením na dodavatelské řetězce a automatickým řízením skladu. Implementace B2B a B2C objednávkových systémů.'"'"',\
    '"'"'eshop.salesGrowth'"'"': '"'"'+150% Růst prodeje'"'"',\
    '"'"'eshop.customers5k'"'"': '"'"'5,000+ Zákazníků'"'"',\
    '"'"'eshop.salesGrowth200'"'"': '"'"'+200% Růst prodeje'"'"',\
    '"'"'eshop.customers8k'"'"': '"'"'8,000+ Zákazníků'"'"',\
    '"'"'eshop.viewCaseStudy'"'"': '"'"'Zobrazit případovou studii'"'"',\
' src/lib/TranslationContext.tsx

echo "Czech e-shop translations added successfully!" 