export interface JargonTerm {
  id: string;
  term: string;
  shortDefinition: string;
  analogy: string;
  indianContext: string;
  category: 'Costs' | 'Risk' | 'Mechanics' | 'Taxation';
}

export const JARGON_TERMS: Record<string, JargonTerm> = {
  'Expense Ratio': {
    id: 'expense-ratio',
    term: 'Expense Ratio (TER)',
    shortDefinition:
      'The annual percentage fee deducted automatically by the mutual fund house (AMC) from the fund to manage your investments.',
    analogy:
      'Like a society maintenance fee charged on your apartment. Whether the building appreciates or depreciates that year, maintenance is deducted.',
    indianContext:
      'SEBI legally caps equity fund TER at 2.25%. Direct plans usually save ~0.5%–1.0% each year compared to regular distributor plans.',
    category: 'Costs',
  },
  'NAV': {
    id: 'nav',
    term: 'Net Asset Value (NAV)',
    shortDefinition:
      'The per-unit market value of a mutual fund scheme, calculated at the end of every business day after subtracting expenses.',
    analogy:
      'Like the price tag on a single slice of a giant shared pizza that holds dozens of different toppings.',
    indianContext:
      'A lower NAV (e.g. ₹15 vs ₹150) does NOT mean a fund is cheap or better. It only reflects how many units you receive for your money.',
    category: 'Mechanics',
  },
  'Demat': {
    id: 'demat',
    term: 'Demat Account (Dematerialized)',
    shortDefinition:
      'An electronic locker maintained with NSDL or CDSL in India to hold your shares, ETFs, and bonds digitally.',
    analogy:
      'Like your email inbox or DigiLocker, but for storing ownership certificates of companies instead of paper documents.',
    indianContext:
      'Mandatory in India to trade individual stocks and ETFs. However, mutual funds can be bought either in Demat or Statement of Account (SoA) mode.',
    category: 'Mechanics',
  },
  'Exit Load': {
    id: 'exit-load',
    term: 'Exit Load',
    shortDefinition:
      'A penalty percentage deducted by the fund house if you redeem your mutual fund units before a minimum specified holding period.',
    analogy:
      'Like a flight cancellation fee charged if you cancel your ticket within 24 hours of departure.',
    indianContext:
      'Most equity funds in India charge 1% if redeemed within 365 days. Index funds typically charge 0% or low fee for 7–15 days.',
    category: 'Costs',
  },
  'Tracking Error': {
    id: 'tracking-error',
    term: 'Tracking Error',
    shortDefinition:
      'The slight percentage divergence between the return of an index fund/ETF and the actual index (e.g. Nifty 50) it mirrors.',
    analogy:
      'Like a cover singer trying to match the original song pitch. A slight variation is normal due to cash drag and fees.',
    indianContext:
      'A lower tracking error means the fund manager is doing a superior job of mirroring the index. Look for funds under 0.05% error.',
    category: 'Mechanics',
  },
  'LTCG': {
    id: 'ltcg',
    term: 'Long Term Capital Gains (LTCG)',
    shortDefinition:
      'Tax on profits made when you sell equity investments held for more than 12 months (or debt funds held prior to April 2023).',
    analogy:
      'The government’s reward discount for patient investing: you pay a lower tax rate because you held the asset long-term.',
    indianContext:
      'Under Budget 2024, equity LTCG is taxed at 12.5% for gains exceeding ₹1.25 Lakh per financial year (up from 10% and ₹1 Lakh).',
    category: 'Taxation',
  },
  'STCG': {
    id: 'stcg',
    term: 'Short Term Capital Gains (STCG)',
    shortDefinition:
      'Tax on profits made from selling equity investments held for less than 12 months.',
    analogy:
      'A turnover fee for quick trades, designed to discourage short-term speculation.',
    indianContext:
      'Under Budget 2024, equity STCG is taxed at a flat rate of 20% (increased from 15%).',
    category: 'Taxation',
  },
  'Indexation': {
    id: 'indexation',
    term: 'Indexation Benefit',
    shortDefinition:
      'An inflation adjustment calculation that artificially raises the purchase cost of an asset to reduce taxable capital gains.',
    analogy:
      'Like adjusting an old salary from 2005 for inflation so you are only taxed on genuine purchasing power gains.',
    indianContext:
      'Since April 1, 2023, indexation benefits for newly purchased Debt Mutual Funds have been removed in India. Gains are now taxed at your income slab.',
    category: 'Taxation',
  },
  'SIP': {
    id: 'sip',
    term: 'Systematic Investment Plan (SIP)',
    shortDefinition:
      'A facility to invest a fixed predetermined amount (e.g. ₹500, ₹2,000) into a fund at regular monthly or weekly intervals.',
    analogy:
      'Like setting up an automated monthly electricity bill payment, but you are paying your future self instead.',
    indianContext:
      'SIP leverages Rupee Cost Averaging: you buy more units when markets are down and fewer when markets are high.',
    category: 'Mechanics',
  },
  'Diversification': {
    id: 'diversification',
    term: 'Diversification',
    shortDefinition:
      'Spreading your investments across multiple companies, sectors, and asset classes to reduce the impact of any single failure.',
    analogy:
      'The classic rule: Never keep all your eggs in one basket. If one drops, the others remain unbroken.',
    indianContext:
      'Buying Nifty 50 index gives you instant diversification across IT, banking, energy, auto, and consumer leaders in India.',
    category: 'Risk',
  },
  'Volatility': {
    id: 'volatility',
    term: 'Volatility',
    shortDefinition:
      'How rapidly and violently the market price of an investment moves up and down over a given period.',
    analogy:
      'Like turbulence on an airplane flight. It feels bumpy and uncomfortable, but the flight continues safely to its destination.',
    indianContext:
      'Indian mid-cap and small-cap stocks experience high volatility, while large-cap index funds experience milder price swings.',
    category: 'Risk',
  },
  'T+1 Settlement': {
    id: 't-plus-one',
    term: 'T+1 Settlement',
    shortDefinition:
      'Trade date plus 1 business day. The timeline within which shares or money settle in your demat or bank account.',
    analogy:
      'Like ordering online with guaranteed next-day delivery.',
    indianContext:
      'India was one of the first major global economies to transition all equities and ETFs to the ultra-fast T+1 rolling cycle.',
    category: 'Mechanics',
  },
  'Brokerage': {
    id: 'brokerage',
    term: 'Brokerage & Platform Charges',
    shortDefinition:
      'The fee charged by an intermediary broker like Groww to execute buy and sell transactions on the stock exchange.',
    analogy:
      'A courier fee charged per delivery parcel.',
    indianContext:
      'On Groww, equity delivery brokerage is capped at ₹20 or 0.05% per order (whichever is lower). Direct mutual funds have zero brokerage.',
    category: 'Costs',
  },
  'Direct Plan': {
    id: 'direct-plan',
    term: 'Direct Plan vs. Regular Plan',
    shortDefinition:
      'A mutual fund scheme bought directly without an intermediary distributor receiving ongoing trail commission.',
    analogy:
      'Buying fresh produce directly from the farmer rather than a supermarket reseller.',
    indianContext:
      'Direct plans on Groww have lower expense ratios, compounding into an extra 0.5%–1.0% return every single year for you.',
    category: 'Costs',
  },
};

export const getJargonTerm = (term: string): JargonTerm | undefined => {
  return JARGON_TERMS[term];
};
