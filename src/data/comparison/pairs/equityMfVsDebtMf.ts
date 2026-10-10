import { PairComparison } from '@/types/comparison';

export const EQUITY_MF_VS_DEBT_MF: PairComparison = {
  id: 'equity-mf-vs-debt-mf',
  categoryAId: 'equity-mf',
  categoryBId: 'debt-mf',
  title: 'Equity Mutual Funds vs. Debt Mutual Funds',
  conciseSummary:
    'Contrasting long-term growth through company ownership against capital preservation and interest income through government and corporate lending.',
  coreTradeOff:
    'Equity funds prioritize inflation-beating capital growth over 5+ years but experience sharp short-term volatility. Debt funds prioritize stability and liquidity for short-term needs but offer lower growth and are taxed at your income slab.',
  dimensions: [
    {
      dimensionKey: 'whatYouOwn',
      title: 'What You Own',
      shortQuestion: 'What underlying financial asset backs your units?',
      whyItMatters:
        'Understanding whether you are an equity owner or a debt lender defines where your investment returns come from.',
      sideA: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Units in a fund that buys ownership shares in 30–60 Indian corporations. You participate in company profits and economic growth.',
        practicalExample:
          'Your money is invested in corporate shares like HDFC Bank, TCS, and Larsen & Toubro.',
        jargonTerms: ['NAV', 'Units'],
      },
      sideB: {
        categoryId: 'debt-mf',
        categoryName: 'Debt Mutual Funds',
        explanation:
          'Units in a fund that lends capital to the Government of India, public sector banks, and corporations in exchange for fixed interest.',
        practicalExample:
          'Your money is loaned via Government of India treasury bills, state development loans, and AAA corporate debentures.',
        jargonTerms: ['G-Sec', 'Credit Rating'],
      },
      importantQualifications:
        'Neither fund type represents bank deposits; both are subject to market valuation at closing NAV.',
    },
    {
      dimensionKey: 'diversification',
      title: 'Diversification',
      shortQuestion: 'How is default and market exposure spread?',
      whyItMatters:
        'Both fund types provide diversification, but across completely different risk vectors (business risk vs borrower default risk).',
      sideA: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Diversified across 30–60 companies across different industry sectors to reduce single-company operational risk.',
        practicalExample:
          'If the IT sector slumps, gains in banking or infrastructure holdings can balance portfolio performance.',
        jargonTerms: ['Diversification'],
      },
      sideB: {
        categoryId: 'debt-mf',
        categoryName: 'Debt Mutual Funds',
        explanation:
          'Diversified across dozens of institutional bond issuers to minimize the risk of any single borrower defaulting on interest.',
        practicalExample:
          'Funds hold sovereign government paper alongside top-tier corporate issuers with staggered maturity dates.',
      },
      importantQualifications:
        'Sovereign debt (G-Secs) has zero credit default risk because it is backed by the Government of India, whereas corporate bonds carry credit risk.',
    },
    {
      dimensionKey: 'mainRisks',
      title: 'Main Risks',
      shortQuestion: 'What forces could cause returns to drop?',
      whyItMatters:
        'Knowing whether interest rates or stock markets drive volatility prevents premature panic or mismatches with your financial goals.',
      sideA: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Stock market risk and company earnings volatility. NAV fluctuates daily with broad market sentiment and business cycles.',
        practicalExample:
          'A nationwide or global market recession can drop equity fund NAVs by 15% to 30% over several months.',
        jargonTerms: ['Volatility', 'Market Risk'],
      },
      sideB: {
        categoryId: 'debt-mf',
        categoryName: 'Debt Mutual Funds',
        explanation:
          'Interest rate risk and credit risk. When the RBI raises interest rates, existing bond prices dip slightly. If a corporate borrower defaults, NAV falls.',
        practicalExample:
          'If the RBI raises benchmark repo rates sharply, medium-to-long duration bond funds see mild short-term price drops.',
        jargonTerms: ['Interest Rate Risk', 'Credit Risk'],
      },
      importantQualifications:
        'Liquid funds and overnight debt funds have minimal interest rate risk due to very short maturity periods (1 to 91 days).',
    },
    {
      dimensionKey: 'liquidityAndRestrictions',
      title: 'Liquidity & Restrictions',
      shortQuestion: 'How quickly can you access your cash?',
      whyItMatters:
        'Emergency money needs fast, restriction-free access, whereas long-term funds can afford brief withdrawal lags.',
      sideA: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Redeemable anytime on business days (T+2 payout). However, most equity funds charge a 1% exit load if redeemed within 365 days.',
        practicalExample:
          'Redeeming after 6 months incurs a 1% fee on your redeemed amount.',
        jargonTerms: ['Exit Load'],
      },
      sideB: {
        categoryId: 'debt-mf',
        categoryName: 'Debt Mutual Funds',
        explanation:
          'Exceptional short-term liquidity. Liquid funds have zero exit load after 7 days, and redemption proceeds often credit within 1 business day (T+1).',
        practicalExample:
          'Liquid funds are frequently used as an emergency fund parking bucket instead of breaking a fixed deposit.',
      },
      importantQualifications:
        'Instant redemption facilities (up to ₹50,000 per day) are available in select liquid funds through verified fund platforms.',
    },
    {
      dimensionKey: 'costsAndFees',
      title: 'Costs & Fee Considerations',
      shortQuestion: 'What annual expenses are deducted?',
      whyItMatters:
        'Debt yields are naturally lower than equity returns, so keeping fees ultra-low in debt funds is critical to preserving real returns.',
      sideA: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Total Expense Ratio (TER) of 1.0% to 2.2% for active management, research, and AMC overheads.',
        practicalExample:
          'A ₹1 Lakh investment deducts approximately ₹1,200 to ₹1,800 annually from the fund value.',
        jargonTerms: ['Expense Ratio'],
      },
      sideB: {
        categoryId: 'debt-mf',
        categoryName: 'Debt Mutual Funds',
        explanation:
          'Significantly lower TER, typically 0.15% to 0.75% for Direct plans of liquid and short-duration debt funds.',
        practicalExample:
          'A ₹1 Lakh investment in a direct liquid fund pays only ₹150 to ₹300 in annual management fees.',
      },
      importantQualifications:
        'Always verify the Direct plan on Groww to ensure distributor commissions do not eat into your bond yield.',
    },
    {
      dimensionKey: 'researchEffort',
      title: 'Research & Monitoring Effort',
      shortQuestion: 'How much ongoing review is needed?',
      whyItMatters:
        'Aligning investment choices with your daily schedule ensures you never neglect necessary portfolio checks.',
      sideA: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Moderate: check fund manager performance against the category benchmark once or twice a year.',
        practicalExample:
          'Compare your scheme’s 3Y and 5Y rolling performance against peers and the Nifty 500 benchmark.',
      },
      sideB: {
        categoryId: 'debt-mf',
        categoryName: 'Debt Mutual Funds',
        explanation:
          'Very low: beginners should simply verify high credit quality (Sovereign/AAA) and appropriate maturity duration.',
        practicalExample:
          'Choose a Banking & PSU Debt Fund or Liquid Fund with predominantly sovereign and AAA assets; minimal tracking required.',
      },
      importantQualifications:
        'Avoid "Credit Risk Funds" unless you possess advanced knowledge of corporate bond restructuring.',
    },
    {
      dimensionKey: 'timeHorizon',
      title: 'Time Horizon Considerations',
      shortQuestion: 'What is the optimal holding duration?',
      whyItMatters:
        'Matching your money’s deadline to the asset class prevents having to sell at a loss when you need cash.',
      sideA: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          '3 to 5+ Years recommended. Essential to give compounding time to outpace short-term cyclical drawdowns.',
        practicalExample:
          'Ideal for goals like a down payment in 6 years, higher education, or long-term wealth building.',
      },
      sideB: {
        categoryId: 'debt-mf',
        categoryName: 'Debt Mutual Funds',
        explanation:
          'A few days to 3 Years depending on category (Liquid: 1–90 days; Short Duration: 1–3 years).',
        practicalExample:
          'Ideal for emergency reserves, semester tuition due in 8 months, or parking cash before an upcoming purchase.',
      },
      importantQualifications:
        'Holding debt funds for 10+ years often results in after-tax returns that struggle to outpace consumer inflation.',
    },
    {
      dimensionKey: 'beginnerGotchas',
      title: 'What a Beginner Must Know First',
      shortQuestion: 'What tax rules and common mistakes should you know?',
      whyItMatters:
        'The Indian Finance Act 2023 changed debt fund taxation, making accurate tax knowledge essential.',
      sideA: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Equity taxation: 20% STCG if sold within 12 months; 12.5% LTCG above ₹1.25L exemption if held over 12 months.',
        practicalExample:
          'You only pay taxes in the financial year you actually redeem your units.',
        jargonTerms: ['LTCG', 'STCG'],
      },
      sideB: {
        categoryId: 'debt-mf',
        categoryName: 'Debt Mutual Funds',
        explanation:
          'Important Tax Rule: Since April 1, 2023, gains from new debt mutual funds in India are taxed at your income tax slab rate, with no indexation benefit.',
        practicalExample:
          'If you fall into the 20% or 30% tax bracket, your debt fund gains are taxed at that exact marginal tax rate.',
        jargonTerms: ['Indexation'],
      },
      importantQualifications:
        'Despite the removal of indexation, debt funds retain tax deferral (you only pay tax upon redemption, unlike FDs where interest is taxed yearly).',
    },
  ],
  importantQualifications: [
    'Debt mutual funds are not risk-free bank fixed deposits; NAV fluctuates with interest rates and bond credit events.',
    'Equity funds carry significantly higher volatility but offer higher historical long-term inflation-hedging capability.',
    'Debt fund taxation follows the Finance Act 2023 slab-rate rules for investments made post-April 2023.',
  ],
  educationalTopics: [
    {
      title: 'Equity vs Debt: The Core Asset Allocation Rule',
      description: 'Why balancing growth and stability is the foundation of every financial plan.',
      termKey: 'Diversification',
    },
    {
      title: 'How Interest Rates Impact Debt Fund NAV',
      description: 'Why bond prices move inversely to RBI interest rate cycles.',
      termKey: 'Interest Rate Risk',
    },
    {
      title: 'Debt Fund Taxation (Finance Act 2023)',
      description: 'Understand slab-rate taxation on fixed-income investments in India.',
      termKey: 'Indexation',
    },
  ],
  suggestedNextSteps: [
    {
      label: 'Explore Debt Mutual Funds on Groww',
      description: 'View liquid, overnight, and corporate bond funds.',
      actionType: 'explore-groww',
      targetCategory: 'debt-mf',
    },
    {
      label: 'Explore Equity Mutual Funds on Groww',
      description: 'View long-term equity growth schemes.',
      actionType: 'explore-groww',
      targetCategory: 'equity-mf',
    },
  ],
};
