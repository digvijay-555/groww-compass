import { PairComparison } from '@/types/comparison';

export const INDEX_FUNDS_VS_ETFS: PairComparison = {
  id: 'index-funds-vs-etfs',
  categoryAId: 'index-funds',
  categoryBId: 'etfs',
  title: 'Index Funds vs. Exchange Traded Funds (ETFs)',
  conciseSummary:
    'Comparing two passive index-tracking instruments: end-of-day mutual fund units bought via bank auto-debit versus shares traded tick-by-tick on the stock exchange through a Demat account.',
  coreTradeOff:
    'Index funds offer seamless, automated monthly SIPs without needing a Demat account or monitoring live market hours. ETFs offer intraday trading flexibility and slightly lower fund management fees, but require a Demat account, manual order placement, and trade volume checks on the exchange.',
  dimensions: [
    {
      dimensionKey: 'whatYouOwn',
      title: 'What You Own',
      shortQuestion: 'How is the asset held and settled?',
      whyItMatters:
        'Determines whether you transact directly with the mutual fund AMC or with other traders on the stock exchange.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Mutual Funds',
        explanation:
          'Units in an index mutual fund scheme held either in Statement of Account (SoA) mode or Demat mode. You transact directly with the AMC at closing NAV.',
        practicalExample:
          'Invest ₹5,000 on Groww; the AMC issues units based on the official closing NAV calculated at the end of the day.',
        jargonTerms: ['NAV'],
      },
      sideB: {
        categoryId: 'etfs',
        categoryName: 'Exchange Traded Funds (ETFs)',
        explanation:
          'Units held strictly as electronic shares in your Demat account, purchased from other buyers and sellers on the NSE or BSE during trading hours.',
        practicalExample:
          'Buy 25 units of NiftyBeES at 11:30 AM on the exchange at the live ask price of ₹265.40.',
        jargonTerms: ['Demat', 'ETF'],
      },
      importantQualifications:
        'Both instruments mirror the exact same underlying benchmark index (e.g. Nifty 50); only the trading wrapper and settlement mechanism differ.',
    },
    {
      dimensionKey: 'diversification',
      title: 'Diversification',
      shortQuestion: 'How diversified is the underlying basket?',
      whyItMatters:
        'Understanding that both instruments provide identical portfolio diversification ensures you do not buy both thinking you are diversifying.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Mutual Funds',
        explanation:
          'Full index diversification (e.g., all 50 Nifty companies or all 30 Sensex companies) proportioned by market capitalization.',
        practicalExample:
          'Single purchase gives fractional exposure to India’s leading banks, IT giants, energy conglomerates, and consumer leaders.',
        jargonTerms: ['Diversification'],
      },
      sideB: {
        categoryId: 'etfs',
        categoryName: 'Exchange Traded Funds (ETFs)',
        explanation:
          'Identical full index diversification. An ETF tracking Nifty 50 holds the exact same 50 companies as an index fund tracking Nifty 50.',
        practicalExample:
          'Holding NiftyBeES gives identical underlying company exposure as holding UTI Nifty 50 Index Fund.',
      },
      importantQualifications:
        'Holding both an ETF and an Index Fund tracking the Nifty 50 results in complete portfolio duplication, not diversification.',
    },
    {
      dimensionKey: 'mainRisks',
      title: 'Main Risks',
      shortQuestion: 'What unexpected risks distinguish the two?',
      whyItMatters:
        'ETFs introduce exchange-related liquidity friction that does not exist in standard mutual funds.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Mutual Funds',
        explanation:
          'Broad market risk + cash drag/tracking error. You are guaranteed transaction execution at the true end-of-day NAV without slippage.',
        practicalExample:
          'No risk of paying an inflated price due to market frenzy; you always receive the mathematical closing NAV.',
        jargonTerms: ['Tracking Error'],
      },
      sideB: {
        categoryId: 'etfs',
        categoryName: 'Exchange Traded Funds (ETFs)',
        explanation:
          'Broad market risk + exchange liquidity risk and bid-ask spread slippage. If trading volume is low, the market price can drift away from indicative NAV (iNAV).',
        practicalExample:
          'During high volatility, an illiquid ETF on NSE might trade at a 1%–2% premium or discount to its underlying value.',
        jargonTerms: ['Bid-Ask Spread', 'iNAV'],
      },
      importantQualifications:
        'High-volume Indian ETFs like NiftyBeES or BankBeES generally have tight spreads, but thematic or gold ETFs can experience noticeable slippage.',
    },
    {
      dimensionKey: 'liquidityAndRestrictions',
      title: 'Liquidity & Restrictions',
      shortQuestion: 'When and how quickly can you buy or sell?',
      whyItMatters:
        'If you require intraday precision, ETFs provide it; if you want hands-off convenience, index funds excel.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Mutual Funds',
        explanation:
          'Orders can be placed 24/7 (processed at the next NAV cut-off time). Proceeds credit in 2–3 business days. No need to monitor market hours.',
        practicalExample:
          'Place an investment order at 10:00 PM on Sunday from your couch; it executes smoothly on Monday’s closing NAV.',
      },
      sideB: {
        categoryId: 'etfs',
        categoryName: 'Exchange Traded Funds (ETFs)',
        explanation:
          'Transactions execute immediately in real time, but strictly between 9:15 AM and 3:30 PM on stock market trading days.',
        practicalExample:
          'If the market dips sharply at 2:00 PM, an ETF investor can buy instantly at that exact second.',
        jargonTerms: ['T+1 Settlement'],
      },
      importantQualifications:
        'ETF sales settle on standard T+1 rolling cycles, crediting your trading balance the following business day.',
    },
    {
      dimensionKey: 'costsAndFees',
      title: 'Costs & Fee Considerations',
      shortQuestion: 'How do annual and transaction fees compare?',
      whyItMatters:
        'While ETFs advertise lower management fees, transaction costs can erase the advantage for frequent small investors.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Mutual Funds',
        explanation:
          'TER is typically 0.1% to 0.4% annually. Zero brokerage per transaction and zero Demat transaction charges.',
        practicalExample:
          'Investing ₹1,000 every month incurs zero transaction commissions on Groww.',
        jargonTerms: ['Expense Ratio'],
      },
      sideB: {
        categoryId: 'etfs',
        categoryName: 'Exchange Traded Funds (ETFs)',
        explanation:
          'Ultra-low TER (0.05% to 0.20%), but you incur stock brokerage (e.g. ₹20 or 0.05%), exchange turnover fees, and DP charges upon selling.',
        practicalExample:
          'Investing small amounts (e.g. ₹500) frequently in ETFs can be expensive due to fixed minimum brokerage charges.',
        jargonTerms: ['Brokerage', 'Expense Ratio'],
      },
      importantQualifications:
        'For large lump-sum investments, the ultra-low TER of an ETF often wins; for small monthly SIPs, index mutual funds are generally more cost-efficient.',
    },
    {
      dimensionKey: 'researchEffort',
      title: 'Research & Monitoring Effort',
      shortQuestion: 'How much operational effort does execution require?',
      whyItMatters:
        'Automated habits lead to higher long-term investing consistency among beginners.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Mutual Funds',
        explanation:
          'Completely effortless automation: set up a one-time bank AutoPay mandate, and Groww automatically debits your bank account on your chosen date.',
        practicalExample:
          'You never need to remember to log in on the 5th of every month to execute trades.',
        jargonTerms: ['SIP'],
      },
      sideB: {
        categoryId: 'etfs',
        categoryName: 'Exchange Traded Funds (ETFs)',
        explanation:
          'Requires active trade execution: you must have sufficient funds in your trading ledger and place orders during market hours.',
        practicalExample:
          'Must remember to use "Limit Orders" instead of "Market Orders" to protect against unfavorable pricing.',
        jargonTerms: ['Limit Order', 'Market Order'],
      },
      importantQualifications:
        'Some brokers offer stock/ETF SIP features, but they still require trading account balances and exchange execution during open hours.',
    },
    {
      dimensionKey: 'timeHorizon',
      title: 'Time Horizon Considerations',
      shortQuestion: 'What investment horizon is suited?',
      whyItMatters:
        'Both are long-term equity instruments and should not be used as day-trading chips.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Mutual Funds',
        explanation:
          '5+ Years recommended. Best suited as the cornerstone core portfolio for long-term financial independence.',
        practicalExample:
          'Patience over a decade allows the Nifty 50 to compound through economic cycles.',
      },
      sideB: {
        categoryId: 'etfs',
        categoryName: 'Exchange Traded Funds (ETFs)',
        explanation:
          '3 to 5+ Years recommended, though also frequently used for tactical asset allocation (e.g. holding Gold ETFs or Liquid ETFs).',
        practicalExample:
          'Used by investors who want the option to quickly reallocate between equities and gold without waiting days for mutual fund redemptions.',
      },
      importantQualifications:
        'Treating ETFs like day-trading stocks often ruins the core benefit of passive long-term compounding.',
    },
    {
      dimensionKey: 'beginnerGotchas',
      title: 'What a Beginner Must Know First',
      shortQuestion: 'What critical practical details must you understand?',
      whyItMatters:
        'Knowing how orders execute prevents beginner order errors and unexpected transaction costs.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Mutual Funds',
        explanation:
          'Demat account is NOT mandatory. You can start investing immediately with simple bank auto-debit. Ideal for busy beginners.',
        practicalExample:
          'No brokerage account or depository maintenance needed; works seamlessly via Groww Mutual Funds.',
      },
      sideB: {
        categoryId: 'etfs',
        categoryName: 'Exchange Traded Funds (ETFs)',
        explanation:
          'A Demat and Trading account IS mandatory. Never place a "Market Order" for an ETF during volatile market openings; always place a "Limit Order" near the iNAV.',
        practicalExample:
          'Checking the iNAV (indicative NAV) on the Groww order screen ensures you do not overpay.',
        jargonTerms: ['Limit Order', 'Demat', 'iNAV'],
      },
      importantQualifications:
        'Taxation is completely identical between the two (20% STCG < 1 yr; 12.5% LTCG > 1 yr above ₹1.25L).',
    },
  ],
  importantQualifications: [
    'Both instruments follow the same underlying index; performance divergence is driven primarily by tracking error and trading spreads.',
    'ETF investing requires a verified Demat account and compliance with exchange trading hours (9:15 AM - 3:30 PM).',
    'Tax treatment is identical under the Indian Income Tax Act (Budget 2024 update).',
  ],
  educationalTopics: [
    {
      title: 'Understanding Indicative NAV (iNAV)',
      description: 'Why you should always check fair value before buying ETFs on an exchange.',
      termKey: 'iNAV',
    },
    {
      title: 'Limit Orders vs Market Orders',
      description: 'How to protect yourself from bid-ask price slippage.',
      termKey: 'Limit Order',
    },
    {
      title: 'Why Automated SIPs Beat Manual Trading',
      description: 'How removing decision friction helps beginners build consistent wealth.',
      termKey: 'SIP',
    },
  ],
  suggestedNextSteps: [
    {
      label: 'Explore Index Funds on Groww',
      description: 'Browse zero-brokerage Nifty 50 and Sensex mutual fund SIPs.',
      actionType: 'explore-groww',
      targetCategory: 'index-funds',
    },
    {
      label: 'Explore ETFs on Groww',
      description: 'View live traded index and gold ETFs on the stock exchange.',
      actionType: 'explore-groww',
      targetCategory: 'etfs',
    },
  ],
};
