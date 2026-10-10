import { InvestmentCategory } from '@/types/investment';

export const INVESTMENT_CATEGORIES: InvestmentCategory[] = [
  {
    id: 'stocks',
    name: 'Individual Stocks',
    tagline: 'Direct Ownership in Specific Companies',
    badge: 'Direct Equity',
    shortDescription:
      'Buy fractional shares of a single publicly listed business on the NSE or BSE. You participate directly in that specific company’s business growth or decline.',
    ownership:
      'Direct equity shares of a specific company, credited and held in your Demat account under your PAN.',
    importantConsideration:
      'High company-specific risk: if the specific business faces headwinds or poor management, your invested capital can drop sharply, even if the broader market is rising.',
    dependsOnProviderNotice:
      'Brokerage fees, delivery charges, and research tools vary by broker (e.g., Groww charges up to ₹20 per order). Stock prices fluctuate second-by-second based on exchange buyers and sellers.',
    experienceLevelNotes: {
      beginner:
        'Think of this like buying a small piece of a local shop. If the shop makes profits, your piece is worth more; if the shop loses customers, your piece drops in value.',
      basics:
        'Unlike funds, single stocks provide zero built-in diversification. Picking winners requires analyzing quarterly earnings, balance sheets, and competitive moat.',
      exploring:
        'Subject to Budget 2024 tax rules (20% STCG for holding <1 year, 12.5% LTCG above ₹1.25L). Intraday liquidity depends on the stock market cap.',
    },
    keyQuestionsToAsk: [
      'Do I understand how this company earns revenue and profits?',
      'Can I handle a 20–30% drop in share price without panicking?',
      'Do I have time to track quarterly corporate earnings reports?',
    ],
    supportedComparisons: [
      {
        targetId: 'equity-mf',
        targetName: 'Equity Mutual Funds',
        reason: 'Compare single company ownership against a professional 40-stock basket.',
      },
      {
        targetId: 'index-funds',
        targetName: 'Index Funds',
        reason: 'Compare active stock picking against automated tracking of the top 50 Indian companies.',
      },
    ],
    riskLevel: 'Very High',
    effortLevel: 'Active',
    horizon: '5+ Years recommended',
    typicalReturnsProfile:
      'Tied directly to company business performance. High volatility in the short-to-medium term.',
    growwDestination: {
      label: 'Explore Stocks on Groww',
      path: 'https://groww.in/stocks',
    },
  },
  {
    id: 'equity-mf',
    name: 'Equity Mutual Funds',
    tagline: 'Professionally Managed Baskets of Stocks',
    badge: 'Active Diversified',
    shortDescription:
      'A pooled investment fund managed by experienced fund managers who pick and balance 30–60 company shares aiming to outperform market benchmarks.',
    ownership:
      'Units of a registered mutual fund scheme. The fund owns the actual shares, while you hold proportionate units valued by the scheme NAV.',
    importantConsideration:
      'Fund manager risk and higher ongoing fees: you pay an annual Expense Ratio (typically 1.0%–2.2%) whether the fund beats the market or underperforms.',
    dependsOnProviderNotice:
      'Expense ratios, exit loads (often 1% if redeemed within 1 year), minimum SIP amounts (₹100–₹1,000), and fund manager strategies vary significantly across Asset Management Companies (AMCs).',
    experienceLevelNotes: {
      beginner:
        'Like hiring an experienced professional driver to navigate traffic in a shared bus with 40 seats. You pay a small ticket fee (expense ratio) so you don’t have to drive yourself.',
      basics:
        'Instant diversification across sectors (banking, IT, FMCG). The key choice is whether the manager’s chance to generate "alpha" justifies the higher expense ratio over passive index funds.',
      exploring:
        'SEBI categorizes equity schemes into Large Cap, Mid Cap, Flexi Cap, and Small Cap with mandatory allocation rules. Direct plans on Groww eliminate intermediary commissions.',
    },
    keyQuestionsToAsk: [
      'Is the fund manager consistently beating its benchmark index over 5+ years?',
      'What is the Total Expense Ratio (TER) of the Direct plan?',
      'What is the exit load period if I need to withdraw money early?',
    ],
    supportedComparisons: [
      {
        targetId: 'index-funds',
        targetName: 'Index Funds',
        reason: 'Compare paying active management fees vs. paying rock-bottom fees for market matching.',
      },
      {
        targetId: 'stocks',
        targetName: 'Individual Stocks',
        reason: 'Compare delegating stock research to an AMC vs. picking companies yourself.',
      },
    ],
    riskLevel: 'High',
    effortLevel: 'Moderate',
    horizon: '3–5+ Years',
    typicalReturnsProfile:
      'Targets long-term capital appreciation higher than broad market benchmarks through active security selection.',
    growwDestination: {
      label: 'Explore Mutual Funds on Groww',
      path: 'https://groww.in/mutual-funds',
    },
  },
  {
    id: 'index-funds',
    name: 'Index Funds',
    tagline: 'Rule-Based Replication of Market Benchmarks',
    badge: 'Passive Market Trackers',
    shortDescription:
      'A mutual fund that automatically copies a market benchmark like the Nifty 50 or Sensex. No fund manager picks stocks, resulting in rock-bottom expense ratios.',
    ownership:
      'Units in an index fund scheme that mirrors the exact holdings and weightings of the underlying benchmark index.',
    importantConsideration:
      'Pure market risk with zero downside cushion: when the broad market falls by 15%, the index fund will also fall by approximately 15%. No manager will move money to cash.',
    dependsOnProviderNotice:
      'Tracking error (divergence between fund and index), tracking difference, and expense ratios (0.1%–0.5%) vary across fund houses. Minimum SIP usually starts from ₹100.',
    experienceLevelNotes: {
      beginner:
        'Like betting on the entire Indian economy rather than trying to guess which individual company will win. As India’s top 50 companies grow over decades, your investment grows.',
      basics:
        'Automated self-cleansing: if a company struggles and drops out of the Nifty 50, it is automatically replaced by an emerging leader without capital gains tax to you.',
      exploring:
        'Evaluate the fund by tracking error and AUM size rather than past returns alone. Identical equity taxation applies (12.5% LTCG above ₹1.25L).',
    },
    keyQuestionsToAsk: [
      'What is the fund’s tracking error relative to the Nifty 50 or Sensex?',
      'Am I prepared to stay invested through a 3–5 year market cycle without selling during dips?',
      'Is the AUM large enough to ensure smooth redemptions?',
    ],
    supportedComparisons: [
      {
        targetId: 'equity-mf',
        targetName: 'Equity Mutual Funds',
        reason: 'Compare low-cost automated market tracking against active fund manager stock selection.',
      },
      {
        targetId: 'etfs',
        targetName: 'Exchange Traded Funds (ETFs)',
        reason: 'Compare end-of-day NAV mutual fund convenience against live exchange trading.',
      },
      {
        targetId: 'debt-mf',
        targetName: 'Debt Mutual Funds',
        reason: 'Compare long-term inflation-beating equity growth against short-term capital preservation.',
      },
    ],
    riskLevel: 'Moderate',
    effortLevel: 'Passive',
    horizon: '5+ Years',
    typicalReturnsProfile:
      'Matches the returns of the underlying index minus a small fraction for tracking fees.',
    growwDestination: {
      label: 'Explore Index Funds on Groww',
      path: 'https://groww.in/mutual-funds/index-funds',
    },
  },
  {
    id: 'etfs',
    name: 'Exchange Traded Funds (ETFs)',
    tagline: 'Index Baskets Traded in Real-Time Like Stocks',
    badge: 'Exchange Traded',
    shortDescription:
      'Index baskets that trade tick-by-tick on the stock exchange during market hours. Combines the diversification of an index fund with the trading flexibility of a stock.',
    ownership:
      'Units held in your Demat account, purchased directly on the stock exchange (NSE/BSE) at live market prices.',
    importantConsideration:
      'Exchange liquidity and bid-ask spread risk: on Indian exchanges, smaller ETFs may have low trading volume, meaning you might buy at a premium or sell at a discount to the true NAV.',
    dependsOnProviderNotice:
      'Requires a Demat and trading account. Demat transaction charges, stock brokerage, and market trading volume vary by broker and specific ETF ticker.',
    experienceLevelNotes: {
      beginner:
        'Like buying a pre-packaged fruit basket from a live market stall instead of ordering directly from a farm catalog. You can buy or sell your basket immediately at whatever price buyers agree to.',
      basics:
        'Ultra-low AMC expense ratio (often 0.05%–0.25%), but you must use Limit Orders during market hours to prevent paying above the indicative NAV (iNAV).',
      exploring:
        'In India, setting up an automatic recurring SIP is easier in Index Mutual Funds (direct bank mandate) than in ETFs (requires automated exchange order placement).',
    },
    keyQuestionsToAsk: [
      'Is there sufficient daily trading volume on NSE/BSE to buy and sell without high slippage?',
      'Is the live market price close to the indicative NAV (iNAV)?',
      'Do I want intraday trading flexibility or do I prefer hands-off end-of-day mutual fund SIP?',
    ],
    supportedComparisons: [
      {
        targetId: 'index-funds',
        targetName: 'Index Funds',
        reason: 'Compare Demat live trading vs. non-Demat mutual fund automated SIPs.',
      },
      {
        targetId: 'stocks',
        targetName: 'Individual Stocks',
        reason: 'Compare trading an entire market basket vs. trading single company shares on the exchange.',
      },
    ],
    riskLevel: 'Moderate',
    effortLevel: 'Moderate',
    horizon: '3–5+ Years',
    typicalReturnsProfile:
      'Tracks market or commodity benchmarks with low AMC fees, subject to exchange price slippage.',
    growwDestination: {
      label: 'Explore ETFs on Groww',
      path: 'https://groww.in/etfs',
    },
  },
  {
    id: 'debt-mf',
    name: 'Debt Mutual Funds',
    tagline: 'Capital Preservation & Fixed-Income Securities',
    badge: 'Capital Preservation',
    shortDescription:
      'Funds that lend money to the Government of India, public sector banks, and high-grade corporations in exchange for regular interest. Prioritizes capital stability.',
    ownership:
      'Units in a mutual fund scheme that holds bonds, government securities (G-Secs), treasury bills, and commercial papers.',
    importantConsideration:
      'Taxation update & lower growth: post-April 2023, gains from debt mutual funds in India are taxed at your income tax slab rate. They do not generate long-term equity-like compounding.',
    dependsOnProviderNotice:
      'Maturity duration (Overnight, Liquid, Ultra Short, Corporate Bond), credit risk of underlying issuers, and expense ratios vary across schemes.',
    experienceLevelNotes: {
      beginner:
        'Like putting money in a shared lending club that only loans to the Indian government and giant top-rated companies for interest, rather than taking chances on the stock market.',
      basics:
        'Superior liquidity compared to Fixed Deposits (FDs) because there is typically no premature withdrawal penalty after a few days. Excellent for emergency funds.',
      exploring:
        'Be mindful of modified duration (interest rate risk) and credit rating profile (stick to sovereign G-Secs or AAA corporate debt to avoid credit defaults).',
    },
    keyQuestionsToAsk: [
      'What is the credit quality of the underlying bonds (AAA vs lower)?',
      'What is the average maturity, and does it match when I will need this money?',
      'What is my income tax slab, since gains are taxed at income rates?',
    ],
    supportedComparisons: [
      {
        targetId: 'index-funds',
        targetName: 'Index Funds',
        reason: 'Compare low-volatility emergency parking against long-term equity wealth building.',
      },
      {
        targetId: 'equity-mf',
        targetName: 'Equity Mutual Funds',
        reason: 'Compare lending instruments (interest) against equity ownership (business profits).',
      },
    ],
    riskLevel: 'Low',
    effortLevel: 'Passive',
    horizon: '1–3 Years',
    typicalReturnsProfile:
      'Earns bond yield and periodic interest with significantly lower volatility than equity markets.',
    growwDestination: {
      label: 'Explore Debt Funds on Groww',
      path: 'https://groww.in/mutual-funds/debt-funds',
    },
  },
];

export const getCategoryById = (id: string): InvestmentCategory | undefined => {
  return INVESTMENT_CATEGORIES.find((cat) => cat.id === id);
};
