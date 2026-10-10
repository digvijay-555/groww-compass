import { PairComparison } from '@/types/comparison';

export const INDEX_FUNDS_VS_EQUITY_MF: PairComparison = {
  id: 'index-funds-vs-equity-mf',
  categoryAId: 'index-funds',
  categoryBId: 'equity-mf',
  title: 'Index Funds vs. Actively Managed Equity Funds',
  conciseSummary:
    'Comparing automated, low-cost replication of major market indices (e.g., Nifty 50) against human fund managers attempting to outperform the market at higher management fees.',
  coreTradeOff:
    'Index funds deliver market benchmark returns at rock-bottom fees (0.1%–0.4% TER) with zero human bias. Active equity funds charge higher fees (1.0%–2.2% TER) for the possibility of beating the benchmark through active stock selection.',
  dimensions: [
    {
      dimensionKey: 'whatYouOwn',
      title: 'What You Own',
      shortQuestion: 'How are the underlying companies chosen?',
      whyItMatters:
        'The selection method dictates whether your portfolio is determined by mathematical index rules or by human analytical judgment.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Funds',
        explanation:
          'Units in a fund that holds the exact same companies in the exact same proportion as a benchmark index (e.g. Nifty 50 or Sensex).',
        practicalExample:
          'A Nifty 50 index fund automatically holds the 50 largest Indian companies weighted by free-float market capitalization.',
        jargonTerms: ['Index', 'Benchmark'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Active Equity Funds',
        explanation:
          'Units in a fund where professional portfolio managers actively buy and sell companies based on research, valuations, and economic forecasts.',
        practicalExample:
          'An active large-and-mid cap fund manager chooses 40 specific companies they believe will outperform competitors.',
        jargonTerms: ['Alpha', 'AMC'],
      },
      importantQualifications:
        'Index funds do not attempt to beat the market; they aim to match it as accurately as possible minus tracking fees.',
    },
    {
      dimensionKey: 'diversification',
      title: 'Diversification',
      shortQuestion: 'How is company and sector concentration controlled?',
      whyItMatters:
        'Rule-based indices evolve automatically as companies grow or shrink, whereas active managers make deliberate conviction bets.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Funds',
        explanation:
          'Rule-based diversification across India’s 50 largest leaders. Semi-annual automated rebalancing replaces declining companies with emerging leaders.',
        practicalExample:
          'If a prominent corporation deteriorates and exits the Nifty 50, the index fund automatically sells it and buys the new entrant.',
        jargonTerms: ['Diversification'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Active Equity Funds',
        explanation:
          'Discretionary diversification: fund managers can take overweight or underweight positions in specific sectors or cash to manage risk.',
        practicalExample:
          'The manager can decide to hold 10% in cash or double down on manufacturing stocks if they expect a sector boom.',
      },
      importantQualifications:
        'SEBI limits single-stock exposure in all mutual funds to prevent dangerous concentration.',
    },
    {
      dimensionKey: 'mainRisks',
      title: 'Main Risks',
      shortQuestion: 'What are the main risks involved?',
      whyItMatters:
        'Index funds suffer from full market swings, while active funds suffer from manager mistakes in addition to market swings.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Funds',
        explanation:
          'Pure broad-market risk: if the Nifty 50 drops by 20%, the fund will drop by roughly 20%. No fund manager can shift to defensive cash.',
        practicalExample:
          'During the March 2020 pandemic crash, index funds took the full brunt of the index drop without defensive hedging.',
        jargonTerms: ['Market Risk'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Active Equity Funds',
        explanation:
          'Market risk plus manager underperformance risk: the manager might pick the wrong stocks and lag the benchmark index.',
        practicalExample:
          'An active fund can drop 25% even if the broader Nifty 50 only dropped 20% if the manager’s high-conviction picks underperform.',
        jargonTerms: ['Alpha'],
      },
      importantQualifications:
        'Neither fund provides downside guarantees or principal protection during bear markets.',
    },
    {
      dimensionKey: 'liquidityAndRestrictions',
      title: 'Liquidity & Restrictions',
      shortQuestion: 'What are the redemption conditions and exit loads?',
      whyItMatters:
        'Exit load differences can affect your net payout if you need to redeem earlier than planned.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Funds',
        explanation:
          'Redeemable any business day at end-of-day NAV. Many index funds charge 0% exit load or a low fee (0.25%) if redeemed within 7–15 days.',
        practicalExample:
          'Redeeming after 1 month usually incurs zero exit penalty in most Nifty 50 index funds.',
        jargonTerms: ['Exit Load'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Active Equity Funds',
        explanation:
          'Redeemable any business day at closing NAV, but most active schemes impose a 1% exit load for redemptions within 365 days.',
        practicalExample:
          'Withdrawing ₹50,000 after 8 months results in a ₹500 exit load deduction.',
        jargonTerms: ['Exit Load'],
      },
      importantQualifications:
        'Both fund types settle redemption proceeds in 2 to 3 business days into your bank account.',
    },
    {
      dimensionKey: 'costsAndFees',
      title: 'Costs & Fee Considerations',
      shortQuestion: 'How wide is the annual fee gap?',
      whyItMatters:
        'This is the single most quantifiable structural difference: fees are guaranteed, but outperformance is not.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Funds',
        explanation:
          'Ultra-low Total Expense Ratio (TER), typically 0.1% to 0.4% in Direct plans. No salaries for research analysts or stock pickers.',
        practicalExample:
          'A ₹1 Lakh investment costs only ₹100 to ₹400 annually in fund management expenses.',
        jargonTerms: ['Expense Ratio', 'Tracking Error'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Active Equity Funds',
        explanation:
          'Higher TER of 1.0% to 2.2% in Direct plans, funding active research, fund management salaries, and operations.',
        practicalExample:
          'A ₹1 Lakh investment costs ₹1,000 to ₹2,000 annually. Over 25 years, this 1.5% fee difference can eat up 25% of your final wealth.',
        jargonTerms: ['Expense Ratio'],
      },
      importantQualifications:
        'To justify higher fees, an active manager must beat the index by more than their expense ratio year after year.',
    },
    {
      dimensionKey: 'researchEffort',
      title: 'Research & Monitoring Effort',
      shortQuestion: 'How much ongoing investor attention is required?',
      whyItMatters:
        'A truly hands-off strategy avoids decision fatigue and emotional trading mistakes.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Funds',
        explanation:
          'Extremely low: the gold standard for "Set and Forget" investing. Automate a monthly SIP and review once a year.',
        practicalExample:
          'No need to track whether a star fund manager has resigned or switched to another AMC.',
        jargonTerms: ['SIP'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Active Equity Funds',
        explanation:
          'Moderate: requires periodic checks to ensure the fund manager is still generating benchmark-beating returns.',
        practicalExample:
          'If an active fund underperforms its benchmark for 3 consecutive years, you may need to evaluate exiting or switching.',
      },
      importantQualifications:
        'For index funds, your only check is that tracking error remains low (<0.05%) and AUM remains healthy.',
    },
    {
      dimensionKey: 'timeHorizon',
      title: 'Time Horizon Considerations',
      shortQuestion: 'What time frame suits each approach?',
      whyItMatters:
        'Passive index investing relies on multi-decade economic compounding to achieve its best historical results.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Funds',
        explanation:
          '5 to 10+ Years recommended. Over 7–10 year rolling periods, broad Indian market indices have demonstrated strong inflation-beating resilience.',
        practicalExample:
          'Ideal for building wealth for goals 10+ years away, like financial independence or buying a home.',
        jargonTerms: ['CAGR'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Active Equity Funds',
        explanation:
          '3 to 5+ Years recommended. Gives the active manager time to realize their valuation bets across cyclical market phases.',
        practicalExample:
          'Used by investors willing to track fund performance and seek potential excess returns (alpha).',
      },
      importantQualifications:
        'Neither product is appropriate for money you will need in less than 3 years.',
    },
    {
      dimensionKey: 'beginnerGotchas',
      title: 'What a Beginner Must Know First',
      shortQuestion: 'What data and practical insights are crucial for first-timers?',
      whyItMatters:
        'Industry statistics reveal counter-intuitive truths about how active managers perform against simple indices.',
      sideA: {
        categoryId: 'index-funds',
        categoryName: 'Index Funds',
        explanation:
          'Watch out for "Tracking Error". An index fund with high tracking error fails to copy the index accurately. Look for low tracking error and high AUM on Groww.',
        practicalExample:
          'Identical Indian equity taxation: 20% STCG (<1 yr) and 12.5% LTCG above ₹1.25L (>1 yr).',
        jargonTerms: ['Tracking Error', 'LTCG'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Active Equity Funds',
        explanation:
          'The SPIVA India Report regularly shows that over 70%–80% of active large-cap mutual funds fail to beat the Nifty 50 benchmark over 5-year and 10-year periods after accounting for fees.',
        practicalExample:
          'Do not chase last year’s #1 ranking fund; top-performing funds rotate constantly.',
        jargonTerms: ['Alpha'],
      },
      importantQualifications:
        'In smaller companies (Mid Cap and Small Cap), some skilled active managers have historically found mispriced stocks and beaten benchmarks.',
    },
  ],
  importantQualifications: [
    'Past performance of an active manager or the benchmark index does not guarantee future returns.',
    'Expense ratios are capped by SEBI regulations but vary by scheme AUM.',
    'Both investments are treated identically under Indian capital gains tax rules (Budget 2024).',
  ],
  educationalTopics: [
    {
      title: 'What is Tracking Error?',
      description: 'Why index funds differ slightly from the actual index return.',
      termKey: 'Tracking Error',
    },
    {
      title: 'Active Alpha vs Passive Beta',
      description: 'The fundamental trade-off between trying to beat the market and matching it.',
      termKey: 'Alpha',
    },
    {
      title: 'The Compounding Impact of Expense Ratios',
      description: 'See how a 1% fee difference compounds over a working career.',
      termKey: 'Expense Ratio',
    },
  ],
  suggestedNextSteps: [
    {
      label: 'Explore Index Funds on Groww',
      description: 'View low-cost Nifty 50 and Sensex tracking schemes.',
      actionType: 'explore-groww',
      targetCategory: 'index-funds',
    },
    {
      label: 'Explore Active Equity Mutual Funds on Groww',
      description: 'Review top flexi-cap, mid-cap, and large-cap schemes.',
      actionType: 'explore-groww',
      targetCategory: 'equity-mf',
    },
  ],
};
