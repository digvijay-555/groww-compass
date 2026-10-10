import { EducationalTopic } from '@/types/education';

export const EDUCATIONAL_TOPICS: Record<string, EducationalTopic> = {
  diversification: {
    id: 'diversification',
    term: 'Diversification',
    shortDefinition:
      'Spreading your investment across multiple companies, sectors, or asset classes rather than concentrating everything in one place.',
    whyItMatters:
      'It reduces the damage to your total portfolio if any single business or industry faces a major downturn, corporate scandal, or bankruptcy.',
    example:
      'If you invest in 40 different companies and one fails completely, you only lose 2.5% of your money. If you invested all in that single company, you would lose 100%.',
    limitationOrMisconception:
      'Misconception: Diversification does not eliminate market risk. When the entire stock market crashes in a recession, diversified funds will still drop.',
    category: 'Foundations',
    relatedTopicIds: ['company-specific-risk', 'market-risk', 'index-fund'],
    indianContext:
      'SEBI mandates diversification limits in mutual funds so that no equity fund can put more than 10% of its AUM into a single company.',
  },
  volatility: {
    id: 'volatility',
    term: 'Volatility',
    shortDefinition:
      'The speed and magnitude with which the market price of an investment swings up and down over a given period.',
    whyItMatters:
      'Understanding volatility helps you mentally prepare for normal price swings so you do not panic-sell when markets temporarily dip.',
    example:
      'If a fund’s value moves between ₹90 and ₹120 in a few weeks, it has high volatility. If it hovers steadily between ₹98 and ₹102, it has low volatility.',
    limitationOrMisconception:
      'Misconception: Volatility is NOT the same as permanent loss. For long-term investors, short-term volatility is often just temporary noise along a growth trajectory.',
    category: 'Risk',
    relatedTopicIds: ['market-risk', 'time-horizon', 'diversification'],
    indianContext:
      'Indian small-cap and mid-cap stocks have much higher volatility than blue-chip Nifty 50 companies.',
  },
  'expense-ratio': {
    id: 'expense-ratio',
    term: 'Expense Ratio (TER)',
    shortDefinition:
      'The annual percentage fee deducted automatically by the mutual fund company (AMC) from the fund assets to cover management, administration, and operations.',
    whyItMatters:
      'Fees are deducted whether the fund makes profits or losses. A 1% fee difference over 20 years can reduce your final compounded corpus by over 20%.',
    example:
      'On a ₹1,00,000 investment, an expense ratio of 0.2% deducts ₹200 annually, while a 1.8% expense ratio deducts ₹1,800 annually from the fund NAV.',
    limitationOrMisconception:
      'Misconception: You do not pay this fee separately like a bill. It is subtracted daily from the NAV before returns are reported to you.',
    category: 'Costs',
    relatedTopicIds: ['index-fund', 'active-vs-passive'],
    indianContext:
      'SEBI caps mutual fund TER based on scheme size. Choosing Direct plans on Groww eliminates distributor trail commissions, saving 0.5%–1.0% each year.',
  },
  liquidity: {
    id: 'liquidity',
    term: 'Liquidity',
    shortDefinition:
      'How quickly, easily, and reliably an investment can be converted into cash without taking a significant loss in value.',
    whyItMatters:
      'If you face an urgent financial emergency, low-liquidity investments can leave you trapped or forced to sell at severe discounts.',
    example:
      'Money in a Liquid mutual fund can be withdrawn in 1 business day without penalty. Selling physical real estate can take months or years.',
    limitationOrMisconception:
      'Misconception: Having a trading account does not guarantee high liquidity. Smaller stocks or low-volume ETFs on the exchange can have wide spreads where buyers are scarce.',
    category: 'Mechanics',
    relatedTopicIds: ['etf', 'time-horizon'],
    indianContext:
      'Indian equity settlement operates on a T+1 cycle (trade date plus 1 day), while standard equity mutual funds credit bank accounts in 2–3 business days.',
  },
  sip: {
    id: 'sip',
    term: 'SIP (Systematic Investment Plan)',
    shortDefinition:
      'A method of investing a fixed amount of money at regular intervals (such as monthly or weekly) into a mutual fund scheme.',
    whyItMatters:
      'It enforces disciplined saving, eliminates the impossible stress of trying to "time" the market top or bottom, and averages your cost over time (Rupee Cost Averaging).',
    example:
      'Investing ₹2,000 on the 5th of every month buys more fund units when prices are down and fewer units when prices are high.',
    limitationOrMisconception:
      'Misconception: An SIP is not an investment product itself—it is simply a payment schedule. An SIP in an equity fund is still 100% exposed to stock market risk.',
    category: 'Mechanics',
    relatedTopicIds: ['index-fund', 'volatility', 'time-horizon'],
    indianContext:
      'Groww allows setting up automated bank mandates (AutoPay via UPI/e-NACH) starting from as little as ₹100 or ₹500 per month.',
  },
  'market-risk': {
    id: 'market-risk',
    term: 'Market Risk (Systematic Risk)',
    shortDefinition:
      'The risk that broad macroeconomic factors (inflation, interest rate shifts, recessions, geopolitical crises) cause the overall market to drop.',
    whyItMatters:
      'Because market risk affects virtually all companies simultaneously, it cannot be eliminated by diversifying across Indian stocks alone.',
    example:
      'During the March 2020 pandemic onset, nearly all equities on the NSE/BSE dropped together, regardless of how profitable individual companies were.',
    limitationOrMisconception:
      'Misconception: Diversifying across 100 Indian stocks does NOT eliminate market risk. Only asset allocation (holding debt, gold, or cash alongside equity) cushions broad market drops.',
    category: 'Risk',
    relatedTopicIds: ['company-specific-risk', 'volatility', 'diversification'],
    indianContext:
      'When RBI changes the benchmark repo rate, bond markets and stock markets react across the board to the new monetary environment.',
  },
  'company-specific-risk': {
    id: 'company-specific-risk',
    term: 'Company-Specific Risk (Unsystematic Risk)',
    shortDefinition:
      'The hazard that unique events inside a single business—such as poor executive decisions, fraud, product failure, or new competitors—damage its value.',
    whyItMatters:
      'Unlike market risk, company-specific risk CAN be virtually eliminated simply by holding a diversified fund or index fund.',
    example:
      'A phone manufacturer losing market share to rivals causes its share price to slide, even while the rest of the economy is booming.',
    limitationOrMisconception:
      'Misconception: Buying shares in a famous company does not eliminate company risk. Historic Indian giants have faced sudden disruption or management scandals.',
    category: 'Risk',
    relatedTopicIds: ['diversification', 'market-risk', 'index-fund'],
    indianContext:
      'Holding individual stocks exposes you to unsystematic risk; holding the Nifty 50 spreads this risk across India’s top 50 corporate leaders.',
  },
  'index-fund': {
    id: 'index-fund',
    term: 'Index Fund',
    shortDefinition:
      'A passive mutual fund that copies a market benchmark (like the Nifty 50 or Sensex) by holding the exact same shares in the exact same proportion.',
    whyItMatters:
      'It offers rock-bottom expense ratios, complete transparency, and zero reliance on a fund manager’s personal stock-picking predictions.',
    example:
      'A Nifty 50 Index Fund automatically holds the 50 largest Indian corporations. If a company drops out of the index, the fund replaces it automatically.',
    limitationOrMisconception:
      'Misconception: Index funds are not guaranteed to go up every year. They deliver the exact return of the underlying index, including during down years.',
    category: 'Strategies',
    relatedTopicIds: ['etf', 'active-vs-passive', 'expense-ratio'],
    indianContext:
      'Index funds in India do not require a Demat account and can be started with simple bank auto-debit on Groww.',
  },
  etf: {
    id: 'etf',
    term: 'Exchange Traded Fund (ETF)',
    shortDefinition:
      'A basket of securities (tracking an index, sector, or commodity) that trades live throughout the day on a stock exchange just like a single share.',
    whyItMatters:
      'Combines the diversification of an index fund with the intraday trading flexibility and pricing transparency of a stock.',
    example:
      'You can buy or sell units of NiftyBeES or a Gold ETF at 11:15 AM on the NSE at the exact live market quote.',
    limitationOrMisconception:
      'Misconception: ETFs do not always trade at their true NAV. Low-volume ETFs can trade at a premium or discount to their underlying asset (bid-ask spread risk).',
    category: 'Mechanics',
    relatedTopicIds: ['index-fund', 'liquidity', 'active-vs-passive'],
    indianContext:
      'Requires an active Demat and Trading account. Investors should use Limit Orders rather than Market Orders to avoid bad prices.',
  },
  'time-horizon': {
    id: 'time-horizon',
    term: 'Investment Time Horizon',
    shortDefinition:
      'The total length of time you expect to hold an investment before needing to withdraw the capital.',
    whyItMatters:
      'Your time horizon dictates which asset class is safe for you. Equity needs 5+ years to absorb market cycles; short-term money needs low-risk debt or liquid funds.',
    example:
      'Money needed for college fees in 6 months belongs in a Liquid fund. Money set aside for retirement in 20 years belongs in equity or index funds.',
    limitationOrMisconception:
      'Misconception: High historical returns do not make an asset suitable for short periods. Equity has high 10-year compounding, but can be deeply negative over any single 6-month window.',
    category: 'Foundations',
    relatedTopicIds: ['volatility', 'market-risk', 'sip'],
    indianContext:
      'In India, historical rolling 7-to-10-year returns of Nifty 50 have demonstrated high resilience against consumer inflation.',
  },
  'active-vs-passive': {
    id: 'active-vs-passive',
    term: 'Active vs. Passive Investing',
    shortDefinition:
      'Active investing relies on human portfolio managers trying to beat benchmark returns; passive investing uses rules to match benchmark returns at minimum cost.',
    whyItMatters:
      'This is the central philosophical decision in investing: whether to pay higher fees for a manager’s skill (alpha) or pay minimal fees to guarantee benchmark returns.',
    example:
      'Active: A fund manager picks 35 stocks they predict will grow fastest. Passive: An index fund buys all 50 stocks in Nifty 50 at 1/10th the annual fee.',
    limitationOrMisconception:
      'Misconception: Active is not "better" or "worse" universally. Passive wins on cost and consistency; active can provide specialized exposure in mid-caps.',
    category: 'Strategies',
    relatedTopicIds: ['index-fund', 'expense-ratio', 'diversification'],
    indianContext:
      'SPIVA India reports indicate that over 70% of active large-cap mutual fund managers struggle to beat the Nifty 50 benchmark after accounting for fees over 5+ year horizons.',
  },
};

export const getEducationalTopic = (idOrTerm: string): EducationalTopic | undefined => {
  if (!idOrTerm) return undefined;
  // Normalize search by id or by term name
  const normalized = idOrTerm.toLowerCase().trim();

  // Try direct key match
  if (EDUCATIONAL_TOPICS[normalized]) {
    return EDUCATIONAL_TOPICS[normalized];
  }

  // Normalized alphanumeric string for flexible matching
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanInput = clean(normalized);

  // Try lookup by id or term substring
  return Object.values(EDUCATIONAL_TOPICS).find(
    (t) =>
      t.id.toLowerCase() === normalized ||
      t.term.toLowerCase() === normalized ||
      t.term.toLowerCase().includes(normalized) ||
      normalized.includes(t.id.toLowerCase()) ||
      clean(t.id) === cleanInput ||
      clean(t.term).includes(cleanInput) ||
      cleanInput.includes(clean(t.id))
  );
};
