import { DimensionMetadata, CategoryComparisonData } from '@/types/investment';

export const COMPARISON_DIMENSIONS: DimensionMetadata[] = [
  {
    key: 'whatYouOwn',
    title: 'What You Own',
    shortQuestion: 'What legal asset is in your portfolio?',
    description: 'Underlying legal structure and ownership nature of the asset.',
  },
  {
    key: 'diversification',
    title: 'Diversification',
    shortQuestion: 'How spread out is your investment?',
    description: 'Number of underlying companies or securities, and concentration risk.',
  },
  {
    key: 'mainRisks',
    title: 'Main Risks',
    shortQuestion: 'What could cause you to lose money?',
    description: 'Market volatility, business failure, interest rate shifts, or manager error.',
  },
  {
    key: 'liquidityAndRestrictions',
    title: 'Liquidity & Restrictions',
    shortQuestion: 'How quickly and easily can you cash out?',
    description: 'Trading hours, settlement time (T+1), exit loads, and lock-in rules.',
  },
  {
    key: 'costsAndFees',
    title: 'Costs & Fee Considerations',
    shortQuestion: 'What recurring or transaction fees are charged?',
    description: 'Expense ratio (TER), brokerage, demat maintenance, and tracking error.',
  },
  {
    key: 'researchEffort',
    title: 'Research & Monitoring Effort',
    shortQuestion: 'How much time must you commit?',
    description: 'Hands-off passive compounding vs periodic reviews vs daily monitoring.',
  },
  {
    key: 'timeHorizon',
    title: 'Time Horizon Considerations',
    shortQuestion: 'How long should you keep this invested?',
    description: 'Ideal holding period suited to absorb cyclical volatility.',
  },
  {
    key: 'beginnerGotchas',
    title: 'What a Beginner Must Know First',
    shortQuestion: 'Crucial nuances often overlooked by beginners',
    description: 'Indian tax rules (LTCG / STCG / slab tax), demat account needs, and behavioral pitfalls.',
  },
];

export const CATEGORY_DIMENSION_DATA: Record<string, CategoryComparisonData> = {
  stocks: {
    categoryId: 'stocks',
    dimensions: {
      whatYouOwn: {
        summary: 'Direct fractional ownership of an individual company',
        details: 'You hold actual equity shares registered directly in your demat account under your PAN.',
        tags: ['Demat holding', 'Voting rights', 'Dividends'],
        jargonTerms: ['Demat', 'Equity', 'Dividend'],
      },
      diversification: {
        summary: 'Zero built-in diversification (1 company per share purchase)',
        details: 'If that company suffers financial distress or poor management, your entire allocated capital is exposed.',
        tags: ['High concentration risk', 'Manual portfolio building'],
        jargonTerms: ['Concentration Risk'],
      },
      mainRisks: {
        summary: 'Company-specific risk + general market downturn risk',
        details: 'Quarterly earnings misses, regulatory changes, or sector headwinds can drop share prices rapidly without warning.',
        tags: ['Business risk', 'Volatility', 'Capital loss'],
        jargonTerms: ['Volatility'],
      },
      liquidityAndRestrictions: {
        summary: 'High liquidity during market hours (9:15 AM - 3:30 PM)',
        details: 'Settles on standard T+1 rolling cycle. No exit loads, but subject to market trading volume for small-cap stocks.',
        tags: ['T+1 settlement', 'Market hours only', 'Zero exit load'],
        jargonTerms: ['T+1 Settlement', 'Liquidity'],
      },
      costsAndFees: {
        summary: 'Zero AMC fee; per-order brokerage + statutory taxes (STT, GST, Stamp Duty)',
        details: 'Groww charges ₹20 or 0.05% (whichever is lower) per executed equity order. No ongoing management fee.',
        tags: ['Brokerage: ₹20/order max', 'STT & Stamp duty', 'Zero TER'],
        jargonTerms: ['Brokerage', 'STT'],
      },
      researchEffort: {
        summary: 'High: requires active company and financial analysis',
        details: 'Must read annual reports, track quarterly results, evaluate PE ratios, and monitor competitive threats.',
        tags: ['Quarterly earnings', 'Financial literacy needed', 'High active time'],
        jargonTerms: ['P/E Ratio'],
      },
      timeHorizon: {
        summary: '5+ Years for fundamentally strong compounders',
        details: 'Short-term price action is unpredictable; long-term returns track business earnings compounding.',
        tags: ['Long-term horizon', 'Cyclical holding'],
      },
      beginnerGotchas: {
        summary: 'Taxed at 20% STCG (<1 yr) or 12.5% LTCG (>1 yr, above ₹1.25L exemption)',
        details: 'Social media "hot tips" often lead beginners to penny stocks or F&O gambling. Never invest emergency funds in single stocks.',
        tags: ['Budget 2024 tax rules', 'Avoid F&O leverage', 'No guaranteed return'],
        jargonTerms: ['LTCG', 'STCG'],
      },
    },
  },
  'equity-mf': {
    categoryId: 'equity-mf',
    dimensions: {
      whatYouOwn: {
        summary: 'Units of an active mutual fund scheme holding 30–60 stocks',
        details: 'A registered AMC pools money from thousands of investors, and professional fund managers choose where to invest.',
        tags: ['Pooled fund units', 'SEBI regulated AMC', 'Fund manager decisions'],
        jargonTerms: ['AMC', 'NAV', 'Units'],
      },
      diversification: {
        summary: 'Instant broad diversification across sectors and companies',
        details: 'A single fund purchase spreads your money across tech, banking, consumer goods, and industrial leaders.',
        tags: ['30-60 companies', 'Sector limits', 'Low single-stock blowup risk'],
        jargonTerms: ['Diversification'],
      },
      mainRisks: {
        summary: 'Equity market risk + fund manager underperformance risk',
        details: 'While diversified, the fund drops when the overall stock market declines. Managers may also fail to beat benchmarks.',
        tags: ['Market cyclicality', 'Manager alpha risk'],
        jargonTerms: ['Alpha', 'Beta'],
      },
      liquidityAndRestrictions: {
        summary: 'Redeem any business day at closing NAV; may have exit loads',
        details: 'Redemption proceeds credit to your bank account in 2–3 business days. Most equity funds charge a 1% exit load if redeemed before 1 year.',
        tags: ['T+2 payout', '1% exit load < 1 yr', 'Redeem anytime'],
        jargonTerms: ['Exit Load', 'NAV'],
      },
      costsAndFees: {
        summary: 'Total Expense Ratio (TER) of 1.0% to 2.2% deducted daily',
        details: 'The AMC deducts management and operational fees from the fund NAV before reporting returns. Direct plans have lower TER.',
        tags: ['TER: 1.0% - 2.2%', 'Direct plans save ~0.8%', 'No brokerage'],
        jargonTerms: ['Expense Ratio', 'Direct Plan'],
      },
      researchEffort: {
        summary: 'Low to moderate: review scheme performance 1–2 times a year',
        details: 'The fund manager handles daily stock analysis and portfolio rebalancing. You only need to check if the fund is keeping pace with its category benchmark.',
        tags: ['Delegated management', 'Check annually', 'Ideal for busy professionals'],
      },
      timeHorizon: {
        summary: '3 to 5+ Years recommended',
        details: 'Allows the fund manager time to weather short-term market cycles and let underlying business earnings compound.',
        tags: ['Medium-to-long term', 'Compounding horizon'],
        jargonTerms: ['CAGR'],
      },
      beginnerGotchas: {
        summary: 'Always choose Direct-Growth plans on Groww to avoid distributor commissions',
        details: 'Taxation follows equity rules (12.5% LTCG above ₹1.25L). Past 3-year stellar returns do not guarantee future performance.',
        tags: ['Choose Direct Growth', 'Ignore 1-yr top charts', 'Budget 2024 LTCG'],
        jargonTerms: ['Direct Plan', 'LTCG'],
      },
    },
  },
  'index-funds': {
    categoryId: 'index-funds',
    dimensions: {
      whatYouOwn: {
        summary: 'Units of an index fund scheme mirroring benchmarks like Nifty 50',
        details: 'Holds the exact same shares in the exact same proportion as the benchmark index. Zero human stock picking.',
        tags: ['Nifty 50 / Sensex', 'Rule-based passive', 'Self-cleansing basket'],
        jargonTerms: ['Benchmark', 'Index'],
      },
      diversification: {
        summary: 'High: holds the 50 largest, most stable Indian corporations',
        details: 'Automated rebalancing every 6 months. If a company declines, it is replaced by an emerging leader automatically.',
        tags: ['Top 50 Indian companies', 'Systematic rebalancing', 'No key-man risk'],
      },
      mainRisks: {
        summary: 'Pure market risk: drops whenever India’s broad stock market drops',
        details: 'No fund manager can shift to cash or defensively pick stocks during a bear market. You ride the full market cycle.',
        tags: ['Broad market drops', 'Zero downside cushioning', 'Market volatility'],
        jargonTerms: ['Market Risk'],
      },
      liquidityAndRestrictions: {
        summary: 'Redeem anytime at end-of-day NAV; very low or zero exit load',
        details: 'Redemption takes 2–3 business days. Many index funds charge 0% exit load or a nominal 0.25% if redeemed within 7–15 days.',
        tags: ['T+2 / T+3 payout', 'Minimal/zero exit load', 'No demat needed'],
        jargonTerms: ['Exit Load', 'NAV'],
      },
      costsAndFees: {
        summary: 'Extremely low fees: Total Expense Ratio (TER) is typically 0.1% to 0.4%',
        details: 'Because no highly paid stock analysts or portfolio managers are hired, ongoing fees are a fraction of active mutual funds.',
        tags: ['TER: 0.1% - 0.4%', 'Maximizes compounding', 'Zero brokerage'],
        jargonTerms: ['Expense Ratio', 'Tracking Error'],
      },
      researchEffort: {
        summary: 'Very low (True "Set and Forget" investing)',
        details: 'Set up an automated monthly SIP and let the broad Indian economy do the work over decades.',
        tags: ['Passive SIP', 'Zero balance-sheet reading', 'Zero stress'],
        jargonTerms: ['SIP'],
      },
      timeHorizon: {
        summary: '5 to 10+ Years for optimal wealth creation',
        details: 'Historically in India, rolling 7-to-10 year returns of Nifty 50 have demonstrated remarkable resilience against inflation.',
        tags: ['Long-term wealth', 'Decade horizon', 'Patience required'],
      },
      beginnerGotchas: {
        summary: 'Watch out for "Tracking Error" — the slight difference between fund return and actual index',
        details: 'Choose index funds with low tracking error and high AUM. Identical equity taxation (12.5% LTCG after ₹1.25L).',
        tags: ['Check Tracking Error', 'High AUM preferred', 'No Demat mandatory'],
        jargonTerms: ['Tracking Error', 'AUM'],
      },
    },
  },
  etfs: {
    categoryId: 'etfs',
    dimensions: {
      whatYouOwn: {
        summary: 'Units of an exchange-traded basket bought directly on the stock exchange',
        details: 'Similar to an index fund, but held as demat shares and traded tick-by-tick throughout the day like Reliance or TCS.',
        tags: ['Traded on NSE/BSE', 'Held in Demat', 'Live intraday price'],
        jargonTerms: ['Demat', 'ETF'],
      },
      diversification: {
        summary: 'High: mirrors entire index (e.g. Nifty 50, Bank Nifty, Gold ETF)',
        details: 'Gives instantaneous exposure to dozens of underlying companies or commodities in a single transaction.',
        tags: ['Index exposure', 'Multi-sector basket'],
      },
      mainRisks: {
        summary: 'Market risk + "Liquidity & Bid-Ask Spread" risk on Indian exchanges',
        details: 'In India, certain thematic ETFs have low trading volumes. You might have to sell at a discount if there are few buyers at that moment.',
        tags: ['Bid-Ask spread', 'Exchange liquidity risk', 'Market price vs NAV gap'],
        jargonTerms: ['Bid-Ask Spread', 'iNAV'],
      },
      liquidityAndRestrictions: {
        summary: 'Instant execution during market hours (9:15 AM - 3:30 PM)',
        details: 'You can sell instantly in seconds if there is market liquidity. Money settles on T+1. Cannot be bought after 3:30 PM.',
        tags: ['Instant sell in seconds', 'T+1 settlement', 'Trading hours only'],
        jargonTerms: ['T+1 Settlement'],
      },
      costsAndFees: {
        summary: 'Ultra-low TER (0.05% - 0.3%) + small brokerage & demat transaction charges',
        details: 'While the expense ratio is minimal, you pay standard stock brokerage and exchange turnover fees per buy/sell.',
        tags: ['TER: 0.05% - 0.3%', 'Brokerage per order', 'Demat charges apply'],
        jargonTerms: ['Expense Ratio', 'Brokerage'],
      },
      researchEffort: {
        summary: 'Low to moderate: check trading volume before placing market orders',
        details: 'Always check the average daily trading volume and compare the live market price against the indicative NAV (iNAV).',
        tags: ['Check exchange volume', 'Use limit orders', 'Low ongoing effort'],
        jargonTerms: ['Limit Order', 'iNAV'],
      },
      timeHorizon: {
        summary: '3 to 5+ Years (or tactical rebalancing)',
        details: 'Used for both long-term passive holding and tactical asset allocation (e.g. holding Gold ETFs during uncertain times).',
        tags: ['Flexible horizon', 'Core portfolio holding'],
      },
      beginnerGotchas: {
        summary: 'Always place a "Limit Order" instead of a "Market Order" to avoid bad prices',
        details: 'Requires a Demat account. In India, automatic monthly SIP in ETFs is slightly more complex than in mutual funds because orders execute on the exchange.',
        tags: ['Must have Demat', 'Use Limit Orders', 'Manual SIP execution'],
        jargonTerms: ['Limit Order', 'Market Order', 'Demat'],
      },
    },
  },
  'debt-mf': {
    categoryId: 'debt-mf',
    dimensions: {
      whatYouOwn: {
        summary: 'Units of a fund holding government bonds, corporate debt, and money market instruments',
        details: 'Instead of buying shares of companies, the fund lends money to the Government of India or AAA-rated corporations in exchange for interest.',
        tags: ['Lending instruments', 'G-Secs & T-Bills', 'AAA Corporate bonds'],
        jargonTerms: ['G-Sec', 'Yield', 'Credit Rating'],
      },
      diversification: {
        summary: 'High credit diversification across dozens of bond issuers',
        details: 'Spreads loan exposure across sovereign debt and diversified corporate issuers to minimize default risk.',
        tags: ['Sovereign backing', 'Multiple bond issuers'],
      },
      mainRisks: {
        summary: 'Interest rate risk + credit default risk (Much lower than equity)',
        details: 'When RBI hikes interest rates, bond prices dip slightly. If a private company defaults on its bond, NAV can take a hit.',
        tags: ['Interest rate risk', 'Credit risk', 'Inflation erosion'],
        jargonTerms: ['Interest Rate Risk', 'Credit Risk'],
      },
      liquidityAndRestrictions: {
        summary: 'High liquidity: Liquid & Overnight funds settle in T+1 with zero exit load after 7 days',
        details: 'Superior emergency parking compared to fixed deposits which break with heavy penalty.',
        tags: ['T+1 / T+2 redemption', 'Zero lock-in', 'Ideal emergency bucket'],
      },
      costsAndFees: {
        summary: 'Very low TER (0.15% to 0.75%); zero brokerage',
        details: 'Direct plans of liquid and short-duration debt funds carry minimal expense ratios, leaving maximum yield for the investor.',
        tags: ['TER: 0.15% - 0.75%', 'Zero brokerage', 'Direct plans'],
        jargonTerms: ['Expense Ratio'],
      },
      researchEffort: {
        summary: 'Very low: choose high credit quality (G-Sec / AAA)',
        details: 'Beginners should stick to Banking & PSU Debt Funds, Corporate Bond Funds, or Liquid Funds without chasing risky high-yield funds.',
        tags: ['Stick to AAA/Sovereign', 'Check average maturity', 'Minimal ongoing effort'],
        jargonTerms: ['Credit Rating'],
      },
      timeHorizon: {
        summary: 'Few weeks to 3 Years depending on sub-category',
        details: 'Overnight/Liquid funds: 1 day to 3 months. Short-duration funds: 1 to 3 years. Protects money needed in the near term.',
        tags: ['Short-to-medium horizon', 'Emergency parking', 'Low capital risk'],
      },
      beginnerGotchas: {
        summary: 'Important Tax Update: Debt fund gains are now taxed at your income tax slab rate',
        details: 'Since the Finance Act 2023, debt funds purchased after April 1, 2023 no longer receive indexation benefits. Still offers better liquidity than an FD.',
        tags: ['Slab rate taxation', 'No indexation post-2023', 'Better liquidity than FD'],
        jargonTerms: ['Indexation', 'Income Tax Slab'],
      },
    },
  },
};
