import { PairComparison } from '@/types/comparison';

export const STOCKS_VS_EQUITY_MF: PairComparison = {
  id: 'stocks-vs-equity-mf',
  categoryAId: 'stocks',
  categoryBId: 'equity-mf',
  title: 'Individual Stocks vs. Equity Mutual Funds',
  conciseSummary:
    'Comparing direct ownership of single Indian companies against a professionally managed, diversified basket of 30–60 companies.',
  coreTradeOff:
    'Single stocks offer direct control and zero AMC management fees but expose you to severe company-specific blowup risk. Mutual funds charge an ongoing management fee (TER) but spread your risk automatically.',
  dimensions: [
    {
      dimensionKey: 'whatYouOwn',
      title: 'What You Own',
      shortQuestion: 'What legal asset is credited to you?',
      whyItMatters:
        'Understanding your legal claim determines how dividends, voting rights, and corporate bankruptcy affect your capital.',
      sideA: {
        categoryId: 'stocks',
        categoryName: 'Individual Stocks',
        explanation:
          'Direct equity shares of a specific company registered in your Demat account under your PAN.',
        practicalExample:
          'Owning 10 shares of Infosys means you are a direct fractional owner with voting rights and direct dividend payouts.',
        jargonTerms: ['Demat', 'Dividend'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Proportionate units in a registered SEBI mutual fund scheme. The fund owns the shares, while you hold units valued at NAV.',
        practicalExample:
          'Holding units of a Flexi Cap Fund means you own a sliver of 40+ companies bundled together by an AMC.',
        jargonTerms: ['NAV', 'AMC'],
      },
      importantQualifications:
        'Mutual fund investors do not vote on company shareholder resolutions; the fund manager votes on behalf of all unitholders.',
    },
    {
      dimensionKey: 'diversification',
      title: 'Diversification',
      shortQuestion: 'How spread out is your invested capital?',
      whyItMatters:
        'Diversification is the primary defense against catastrophic single-company losses.',
      sideA: {
        categoryId: 'stocks',
        categoryName: 'Individual Stocks',
        explanation:
          'Zero built-in diversification per share purchase. 100% of your allocated money is exposed to that one company’s fortunes.',
        practicalExample:
          'If you invest ₹10,000 in one stock and the company faces accounting fraud or bankruptcy, your entire ₹10,000 can be wiped out.',
        jargonTerms: ['Diversification'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Instant structural diversification across 30–60 companies and multiple sectors (banking, IT, FMCG, auto).',
        practicalExample:
          'If one company in a 50-stock fund drops by 50%, it typically impacts the total fund NAV by only 1% to 2%.',
        jargonTerms: ['Diversification'],
      },
      importantQualifications:
        'An investor can manually diversify single stocks by buying 20+ companies, but this requires substantial capital, tracking, and transaction fees.',
    },
    {
      dimensionKey: 'mainRisks',
      title: 'Main Risks',
      shortQuestion: 'What factors can cause your investment to lose value?',
      whyItMatters:
        'Recognizing risk types prevents panic when market downturns or company crises occur.',
      sideA: {
        categoryId: 'stocks',
        categoryName: 'Individual Stocks',
        explanation:
          'Company-specific business risk + overall market risk. Bad quarterly earnings, management scandals, or technological disruption can permanently destroy value.',
        practicalExample:
          'Even during a strong Indian economic boom, a poorly run individual company can lose 80% of its share price.',
        jargonTerms: ['Volatility'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Broad equity market risk + fund manager underperformance risk. While insulated from single-company collapse, the fund drops when the stock market falls.',
        practicalExample:
          'During a market correction, the entire fund NAV will drop. Furthermore, the fund manager may lag the category benchmark.',
        jargonTerms: ['Alpha', 'Beta'],
      },
      importantQualifications:
        'Neither option is risk-free or capital-protected. Both expose you to stock market volatility.',
    },
    {
      dimensionKey: 'liquidityAndRestrictions',
      title: 'Liquidity & Restrictions',
      shortQuestion: 'How fast and flexibly can you cash out?',
      whyItMatters:
        'Knowing withdrawal rules ensures you do not lock away money you might need for urgent expenses.',
      sideA: {
        categoryId: 'stocks',
        categoryName: 'Individual Stocks',
        explanation:
          'High liquidity during market hours (9:15 AM - 3:30 PM). Trades settle on the Indian T+1 rolling cycle. No exit loads.',
        practicalExample:
          'Sell shares on Monday at 11:00 AM; funds settle and become withdrawable on Tuesday.',
        jargonTerms: ['T+1 Settlement'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Redeemable any business day at end-of-day NAV. Most schemes charge an exit load (typically 1%) if redeemed within 1 year.',
        practicalExample:
          'Submit redemption request on Monday afternoon; money arrives in your verified bank account in 2 to 3 working days.',
        jargonTerms: ['Exit Load', 'NAV'],
      },
      importantQualifications:
        'Penny stocks or illiquid small-cap shares may suffer from lower market volume, making large sell orders difficult without price impact.',
    },
    {
      dimensionKey: 'costsAndFees',
      title: 'Costs & Fee Considerations',
      shortQuestion: 'What ongoing and transactional fees will you pay?',
      whyItMatters:
        'Fees compound negatively over decades; even a 1% annual fee can reduce your total wealth significantly over 20 years.',
      sideA: {
        categoryId: 'stocks',
        categoryName: 'Individual Stocks',
        explanation:
          'Zero ongoing AMC management fee. You pay transaction brokerage (up to ₹20/order on Groww) plus statutory taxes (STT, GST, Stamp Duty).',
        practicalExample:
          'Hold a stock for 10 years without selling, and you pay zero holding charges to the company or broker.',
        jargonTerms: ['Brokerage', 'STT'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Ongoing Total Expense Ratio (TER) typically between 1.0% and 2.2% deducted daily from the fund NAV by the AMC.',
        practicalExample:
          'A ₹1,00,000 mutual fund investment with a 1.5% TER pays roughly ₹1,500 per year automatically out of the portfolio.',
        jargonTerms: ['Expense Ratio', 'Direct Plan'],
      },
      importantQualifications:
        'Direct plans of mutual funds purchased on Groww carry significantly lower expense ratios than regular plans bought through offline distributors.',
    },
    {
      dimensionKey: 'researchEffort',
      title: 'Research & Monitoring Effort',
      shortQuestion: 'How much ongoing time and effort is required from you?',
      whyItMatters:
        'Underestimating the time needed to research individual stocks often leads to emotional decision-making and losses.',
      sideA: {
        categoryId: 'stocks',
        categoryName: 'Individual Stocks',
        explanation:
          'High active effort: requires understanding financial statements, annual reports, quarterly investor calls, and sector competitive dynamics.',
        practicalExample:
          'Investors must review quarterly reports and industry trends regularly to know when a business thesis has broken.',
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Low to moderate effort: professional full-time analysts and fund managers handle daily stock research and rebalancing.',
        practicalExample:
          'Investors only need to review the fund scheme once or twice a year to ensure it stays aligned with its mandate.',
      },
      importantQualifications:
        'Delegating research to a mutual fund manager does not guarantee superior returns over passive market indices.',
    },
    {
      dimensionKey: 'timeHorizon',
      title: 'Time Horizon Considerations',
      shortQuestion: 'How long should you plan to remain invested?',
      whyItMatters:
        'Equity investments need time to compound and recover from periodic market downturns.',
      sideA: {
        categoryId: 'stocks',
        categoryName: 'Individual Stocks',
        explanation:
          '5+ Years recommended for fundamentally sound companies. Short-term stock prices are erratic and sentiment-driven.',
        practicalExample:
          'Great Indian compounders often go through 1–2 flat years before surging based on earnings growth.',
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          '3 to 5+ Years recommended to allow the fund manager’s portfolio strategy to weather market cycles.',
        practicalExample:
          'A 5-year monthly SIP gives rupee cost averaging time to smooth out cyclical market volatility.',
        jargonTerms: ['SIP', 'CAGR'],
      },
      importantQualifications:
        'Never invest emergency funds or money needed within 1–2 years in either single stocks or equity mutual funds.',
    },
    {
      dimensionKey: 'beginnerGotchas',
      title: 'What a Beginner Must Know First',
      shortQuestion: 'What crucial nuances or pitfalls do beginners overlook?',
      whyItMatters:
        'Avoiding common traps like social media stock tips or high-commission regular plans protects your capital early on.',
      sideA: {
        categoryId: 'stocks',
        categoryName: 'Individual Stocks',
        explanation:
          'Beware of "hot stock tips" on Telegram, Instagram, or YouTube. Without your own independent conviction, you will panic-sell during dips.',
        practicalExample:
          'Taxation under Budget 2024: 20% flat STCG if sold within 12 months; 12.5% LTCG above ₹1.25L exemption if held over 12 months.',
        jargonTerms: ['STCG', 'LTCG'],
      },
      sideB: {
        categoryId: 'equity-mf',
        categoryName: 'Equity Mutual Funds',
        explanation:
          'Always select "Direct-Growth" plans rather than "Regular" plans to avoid paying commissions to middlemen. Past 1-year chart toppers rarely repeat at the top.',
        practicalExample:
          'Identical tax treatment applies: equity mutual funds follow 20% STCG (<1 yr) and 12.5% LTCG (>1 yr, above ₹1.25L).',
        jargonTerms: ['Direct Plan', 'LTCG'],
      },
      importantQualifications:
        'Capital gains taxes are levied only when you sell units or shares; simply holding does not trigger capital gains tax.',
    },
  ],
  importantQualifications: [
    'Neither individual stocks nor equity mutual funds offer guaranteed returns or capital preservation.',
    'Stock brokerage charges, DP charges, and mutual fund exit loads vary across brokers and AMCs.',
    'Tax treatment reflects the updated Indian Finance Act (Budget 2024).',
  ],
  educationalTopics: [
    {
      title: 'Why Diversification Protects Your Money',
      description: 'Learn why holding 40 companies cushions your portfolio compared to picking single winners.',
      termKey: 'Diversification',
    },
    {
      title: 'Understanding Total Expense Ratio (TER)',
      description: 'See how a 1.5% fee affects your 20-year compounded returns.',
      termKey: 'Expense Ratio',
    },
    {
      title: 'Direct vs Regular Mutual Fund Plans',
      description: 'Why buying Direct plans on Groww saves you thousands in trail commissions.',
      termKey: 'Direct Plan',
    },
  ],
  suggestedNextSteps: [
    {
      label: 'Explore Equity Mutual Funds on Groww',
      description: 'Browse diversified large, mid, and flexi-cap schemes.',
      actionType: 'explore-groww',
      targetCategory: 'equity-mf',
    },
    {
      label: 'Explore Stocks on Groww',
      description: 'View top Indian market cap leaders on the NSE and BSE.',
      actionType: 'explore-groww',
      targetCategory: 'stocks',
    },
  ],
};
