import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search, MapPin, Clock, TrendingUp, Users, Package, ChevronRight, Star, Shield, AlertCircle, CheckCircle, Menu, X, Filter, ArrowRight, Globe, Phone, Mail, ExternalLink, ChevronDown, Leaf, ShoppingCart, BarChart3, Eye, Camera, FileText, Heart, Share2, Navigation, Calendar, Info, BadgeCheck, AlertTriangle, Truck, Warehouse, Store, Sprout, Bell } from 'lucide-react';
import { markets, products, vendors, categories, contributors, type Market, type Product, type PriceObservation, getActivityLabel, getActivityColor, getFreshnessLabel, getFreshnessColor, formatPrice, formatRelativeTime, getMarketDayText, getEnvironmentLabel, getRoadConditionLabel, getRoadConditionColor } from './data';

// ============ LAYOUT COMPONENTS ============

function SkipLink() {
  return <a href="#main-content" className="skip-link">Skip to main content</a>;
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/markets', label: 'Markets' },
    { to: '/products', label: 'Products' },
    { to: '/map', label: 'Map' },
    { to: '/vendors', label: 'Vendors' },
    { to: '/contribute', label: 'Contribute' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Pheeline Market Place - Home">
            <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-brand-800 tracking-tight">Pheeline</span>
              <span className="text-xs block -mt-1 text-neutral-500 font-medium">Market Place</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname.startsWith(link.to)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop search */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="search"
                  placeholder="Search markets, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-56 lg:w-72 bg-neutral-100 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  aria-label="Search markets and products"
                />
              </div>
            </form>

            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5 text-neutral-600" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="sm:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="search"
                placeholder="Search markets, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                autoFocus
                aria-label="Search markets and products"
              />
            </div>
          </form>
        )}
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-neutral-200 bg-white" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname.startsWith(link.to)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-neutral-200" />
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100">About</Link>
            <Link to="/telegram" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100">Telegram Bot</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Pheeline Market Place</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Discover Nigeria's markets, commodities, prices, vendors and local market intelligence.
            </p>
            <p className="text-xs text-neutral-500 mt-3">
              Discover. Compare. Source.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/markets" className="hover:text-white transition-colors">Markets</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products & Commodities</Link></li>
              <li><Link to="/vendors" className="hover:text-white transition-colors">Vendors</Link></li>
              <li><Link to="/map" className="hover:text-white transition-colors">Map View</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Search</Link></li>
            </ul>
          </div>

          {/* Contribute */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Contribute</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contribute" className="hover:text-white transition-colors">Report a Price</Link></li>
              <li><Link to="/contribute" className="hover:text-white transition-colors">Add a Market</Link></li>
              <li><Link to="/contribute" className="hover:text-white transition-colors">Market Conditions</Link></li>
              <li><Link to="/contribute" className="hover:text-white transition-colors">Upload Photos</Link></li>
              <li><Link to="/contribute" className="hover:text-white transition-colors">Corrections</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/telegram" className="hover:text-white transition-colors">Telegram Bot</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Community Guidelines</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            © 2026 Pheeline Market Place. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://t.me/pheelinemarketplace" className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-1" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5" /> Telegram
            </a>
            <span className="text-neutral-600">•</span>
            <span className="text-xs text-neutral-500">pheelinemarketplace.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// ============ SHARED UI COMPONENTS ============

function ActivityBadge({ status }: { status: string }) {
  return (
    <span className={`badge ${getActivityColor(status as any)}`}>
      {status === 'ACTIVE_NOW' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full pulse-dot" />}
      {getActivityLabel(status as any)}
    </span>
  );
}

function FreshnessIndicator({ freshness }: { freshness: string }) {
  return (
    <span className={`text-xs font-medium ${getFreshnessColor(freshness as any)}`}>
      {getFreshnessLabel(freshness as any)}
    </span>
  );
}

function VerificationBadge({ status }: { status: string }) {
  if (status === 'VERIFIED') {
    return (
      <span className="badge badge-verified">
        <BadgeCheck className="w-3 h-3" /> Verified
      </span>
    );
  }
  if (status === 'PENDING') {
    return <span className="badge badge-pending">Pending Review</span>;
  }
  return null;
}

function MarketCard({ market }: { market: Market }) {
  return (
    <Link
      to={`/markets/${market.slug}`}
      className="block bg-white rounded-xl border border-neutral-200 overflow-hidden card-hover group"
    >
      {/* Header with gradient */}
      <div className={`h-2 ${
        market.activityStatus === 'ACTIVE_NOW' ? 'bg-green-500' :
        market.activityStatus === 'ACTIVE_TODAY' ? 'bg-green-400' :
        market.activityStatus === 'RECENTLY_ACTIVE' ? 'bg-blue-400' :
        'bg-neutral-300'
      }`} />
      
      <div className="p-4 sm:p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors truncate">
              {market.name}
            </h3>
            <p className="text-sm text-neutral-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              {market.nearestSettlement}, {market.state}
            </p>
          </div>
          <ActivityBadge status={market.activityStatus} />
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
          {market.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-neutral">{getEnvironmentLabel(market.environment)}</span>
          <span className="badge badge-neutral">{market.specialization.replace('_', ' ')}</span>
          <span className="badge badge-neutral">{market.function}</span>
        </div>

        {/* Market days */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>{getMarketDayText(market.marketDays[0])}</span>
          {market.marketDays[0].peakHours && (
            <>
              <span className="text-neutral-300">•</span>
              <span>{market.marketDays[0].peakHours}</span>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-neutral-500 pt-3 border-t border-neutral-100">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {market.vendorCount} vendors
          </span>
          <span className="flex items-center gap-1">
            <Package className="w-3.5 h-3.5" /> {market.majorCommodities.length} commodities
          </span>
          <span className="flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" /> {market.photoCount} photos
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="block bg-white rounded-xl border border-neutral-200 overflow-hidden card-hover group"
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="text-3xl" role="img" aria-label={product.name}>{product.imageEmoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">{product.category} › {product.subcategory}</p>
          </div>
        </div>

        {product.avgPrice && (
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-lg font-bold text-neutral-900">{formatPrice(product.avgPrice)}</span>
                <span className="text-sm text-neutral-500 ml-1">/ {product.priceUnit}</span>
              </div>
              {product.priceFreshness && <FreshnessIndicator freshness={product.priceFreshness} />}
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
              <span>{product.activeMarkets} markets</span>
              <span>{product.priceObservationCount} observations</span>
            </div>
          </div>
        )}

        {product.aliases.length > 0 && (
          <p className="text-xs text-neutral-400 mt-2">
            Also known as: {product.aliases.join(', ')}
          </p>
        )}
      </div>
    </Link>
  );
}

function PriceTable({ observations }: { observations: PriceObservation[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" role="table">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Product</th>
            <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Price</th>
            <th className="text-left py-2.5 px-3 font-medium text-neutral-600 hidden sm:table-cell">Unit</th>
            <th className="text-left py-2.5 px-3 font-medium text-neutral-600 hidden md:table-cell">Reported</th>
            <th className="text-left py-2.5 px-3 font-medium text-neutral-600">Freshness</th>
            <th className="text-left py-2.5 px-3 font-medium text-neutral-600 hidden sm:table-cell">Source</th>
          </tr>
        </thead>
        <tbody>
          {observations.map((obs) => (
            <tr key={obs.id} className="border-b border-neutral-100 hover:bg-neutral-50">
              <td className="py-2.5 px-3">
                <span className="font-medium text-neutral-900">{obs.productName}</span>
                {obs.quality && <span className="text-xs text-neutral-500 ml-1">({obs.quality})</span>}
              </td>
              <td className="py-2.5 px-3 font-semibold text-neutral-900">
                {formatPrice(obs.price)}
              </td>
              <td className="py-2.5 px-3 text-neutral-600 hidden sm:table-cell">{obs.unit}</td>
              <td className="py-2.5 px-3 text-neutral-500 hidden md:table-cell">{formatRelativeTime(obs.timestamp)}</td>
              <td className="py-2.5 px-3">
                <FreshnessIndicator freshness={obs.freshness} />
              </td>
              <td className="py-2.5 px-3 hidden sm:table-cell">
                <span className="text-xs text-neutral-500">{obs.contributorName}</span>
                {obs.hasEvidence && <Camera className="w-3 h-3 text-blue-500 inline ml-1" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatsCard({ icon, label, value, sublabel }: { icon: React.ReactNode; label: string; value: string; sublabel?: string }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-neutral-900">{value}</p>
          <p className="text-sm text-neutral-500">{label}</p>
          {sublabel && <p className="text-xs text-neutral-400">{sublabel}</p>}
        </div>
      </div>
    </div>
  );
}

// ============ PAGES ============

function HomePage() {
  const activeMarkets = markets.filter(m => m.activityStatus === 'ACTIVE_NOW' || m.activityStatus === 'ACTIVE_TODAY');
  const recentPrices = markets.flatMap(m => m.priceObservations.map(p => ({ ...p, marketName: m.name, marketSlug: m.slug }))).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
              Discover Nigeria's Markets
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-brand-100 leading-relaxed">
              Markets, prices, commodities, vendors and local market intelligence. Find where to buy, what it costs, and when markets are active.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/markets" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors">
                Explore Markets <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contribute" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-500/30 text-white font-semibold rounded-lg hover:bg-brand-500/40 transition-colors border border-white/20">
                <Camera className="w-4 h-4" /> Report a Price
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatsCard icon={<Store className="w-5 h-5" />} label="Markets" value={markets.length.toString()} sublabel="Across Nigeria" />
          <StatsCard icon={<Package className="w-5 h-5" />} label="Products" value={products.length.toString()} sublabel="Commodities tracked" />
          <StatsCard icon={<Users className="w-5 h-5" />} label="Vendors" value={vendors.length.toString()} sublabel="Listed & verified" />
          <StatsCard icon={<TrendingUp className="w-5 h-5" />} label="Price Reports" value="1,200+" sublabel="Community observations" />
        </div>
      </section>

      {/* Active Markets Now */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">Active Markets Now</h2>
            <p className="text-sm text-neutral-500 mt-1">Markets currently trading based on recent reports</p>
          </div>
          <Link to="/markets" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeMarkets.slice(0, 6).map(market => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>

      {/* Recent Price Intelligence */}
      <section className="bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">Recent Price Intelligence</h2>
              <p className="text-sm text-neutral-500 mt-1">Latest community-reported prices across markets</p>
            </div>
            <Link to="/products" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              All products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100/50">
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600 hidden sm:table-cell">Market</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600 hidden md:table-cell">Reported</th>
                    <th className="text-left py-3 px-4 font-medium text-neutral-600">Freshness</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPrices.map((obs, i) => (
                    <tr key={i} className="border-b border-neutral-100 hover:bg-white">
                      <td className="py-3 px-4 font-medium text-neutral-900">{obs.productName}</td>
                      <td className="py-3 px-4 font-semibold text-neutral-900">{formatPrice(obs.price)}<span className="text-neutral-500 font-normal">/{obs.unit}</span></td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <Link to={`/markets/${(obs as any).marketSlug}`} className="text-brand-600 hover:text-brand-700">{(obs as any).marketName}</Link>
                      </td>
                      <td className="py-3 px-4 text-neutral-500 hidden md:table-cell">{formatRelativeTime(obs.timestamp)}</td>
                      <td className="py-3 px-4"><FreshnessIndicator freshness={obs.freshness} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-3 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            Prices are community-reported observations. They may not reflect current market rates. Always verify before making decisions.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-brand-300 hover:shadow-md transition-all group"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <div>
                <h3 className="font-medium text-neutral-900 group-hover:text-brand-700 transition-colors text-sm">{cat.name}</h3>
                <p className="text-xs text-neutral-500">{cat.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-brand-50/50 border-y border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">How Pheeline Works</h2>
          <p className="text-neutral-600 mb-8">A community-powered market intelligence network</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Search className="w-6 h-6" />, title: 'Discover', desc: 'Find markets, products and vendors across Nigeria. Urban, rural, bush and periodic markets.' },
              { icon: <Eye className="w-6 h-6" />, title: 'Compare', desc: 'See observed prices from multiple markets. Understand price ranges, freshness and confidence.' },
              { icon: <Camera className="w-6 h-6" />, title: 'Contribute', desc: 'Report prices, market conditions and availability. Build your reputation as a trusted scout.' },
              { icon: <Truck className="w-6 h-6" />, title: 'Source', desc: 'Connect with vendors, find bulk sources, plan market visits and make informed decisions.' },
            ].map((item, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 mx-auto sm:mx-0 mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Telegram CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-10 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Get Market Updates on Telegram</h2>
              <p className="text-blue-100 mt-2">Search markets, report prices and get alerts directly through our Telegram bot.</p>
            </div>
            <Link to="/telegram" className="inline-flex items-center gap-2 px-5 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors flex-shrink-0">
              <ExternalLink className="w-4 h-4" /> Open Telegram Bot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function MarketsPage() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [filterState, setFilterState] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterActivity, setFilterActivity] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredMarkets = useMemo(() => {
    let result = [...markets];
    if (filterState) result = result.filter(m => m.state === filterState);
    if (filterType) result = result.filter(m => m.environment === filterType || m.function === filterType);
    if (filterActivity) result = result.filter(m => m.activityStatus === filterActivity);
    return result;
  }, [filterState, filterType, filterActivity]);

  const states = [...new Set(markets.map(m => m.state))].sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Markets</h1>
          <p className="text-neutral-500 mt-1">Discover markets across Nigeria — urban, rural, bush and periodic</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <div className="flex bg-neutral-100 rounded-lg p-0.5">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`} aria-label="Grid view">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="7" height="7" strokeWidth="2" /><rect x="14" y="3" width="7" height="7" strokeWidth="2" /><rect x="3" y="14" width="7" height="7" strokeWidth="2" /><rect x="14" y="14" width="7" height="7" strokeWidth="2" /></svg>
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`} aria-label="List view">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-neutral-200 p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-neutral-600 mb-1 block">State</label>
            <select value={filterState} onChange={e => setFilterState(e.target.value)} className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm">
              <option value="">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 mb-1 block">Type</label>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm">
              <option value="">All Types</option>
              <option value="urban">Urban</option>
              <option value="suburban">Suburban</option>
              <option value="rural">Rural</option>
              <option value="wholesale">Wholesale</option>
              <option value="retail">Retail</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-neutral-600 mb-1 block">Activity</label>
            <select value={filterActivity} onChange={e => setFilterActivity(e.target.value)} className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm">
              <option value="">Any Activity</option>
              <option value="ACTIVE_NOW">Active Now</option>
              <option value="ACTIVE_TODAY">Active Today</option>
              <option value="RECENTLY_ACTIVE">Recently Active</option>
            </select>
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-neutral-500 mb-4">{filteredMarkets.length} markets found</p>

      {/* Market Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMarkets.map(market => <MarketCard key={market.id} market={market} />)}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMarkets.map(market => (
            <Link key={market.id} to={`/markets/${market.slug}`} className="block bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-neutral-900">{market.name}</h3>
                    <ActivityBadge status={market.activityStatus} />
                    <VerificationBadge status={market.verificationStatus} />
                  </div>
                  <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {market.nearestSettlement}, {market.lga}, {market.state}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                    <span>{getMarketDayText(market.marketDays[0])}</span>
                    <span>•</span>
                    <span>{getEnvironmentLabel(market.environment)}</span>
                    <span>•</span>
                    <span>{market.vendorCount} vendors</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-400 flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {filteredMarkets.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-neutral-700">No markets found</h3>
          <p className="text-neutral-500 mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

function MarketDetailPage() {
  const { slug } = useParams();
  const market = markets.find(m => m.slug === slug);

  if (!market) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
        <h1 className="text-xl font-bold text-neutral-900">Market Not Found</h1>
        <p className="text-neutral-500 mt-2">The market you're looking for doesn't exist or has been removed.</p>
        <Link to="/markets" className="mt-4 inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Markets
        </Link>
      </div>
    );
  }

  const priceStats = {
    count: market.priceObservations.length,
    latest: market.priceObservations[0],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-4" aria-label="Breadcrumb">
        <Link to="/markets" className="hover:text-brand-600">Markets</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-900 font-medium">{market.name}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden mb-6">
        <div className={`h-1.5 ${
          market.activityStatus === 'ACTIVE_NOW' ? 'bg-green-500' :
          market.activityStatus === 'ACTIVE_TODAY' ? 'bg-green-400' :
          'bg-neutral-300'
        }`} />
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">{market.name}</h1>
                <ActivityBadge status={market.activityStatus} />
              </div>
              {market.aliases.length > 0 && (
                <p className="text-sm text-neutral-500">Also known as: {market.aliases.join(', ')}</p>
              )}
              <p className="text-neutral-600 mt-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-neutral-400" />
                {market.nearestSettlement}, {market.lga}, {market.state}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50" aria-label="Share market">
                <Share2 className="w-4 h-4 text-neutral-600" />
              </button>
              <button className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50" aria-label="Save market">
                <Heart className="w-4 h-4 text-neutral-600" />
              </button>
              <VerificationBadge status={market.verificationStatus} />
            </div>
          </div>

          <p className="text-neutral-700 mt-4 leading-relaxed">{market.description}</p>

          {/* Quick info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-neutral-100">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Market Days</p>
              <p className="font-medium text-neutral-900 mt-0.5">{getMarketDayText(market.marketDays[0])}</p>
              {market.marketDays[0].peakHours && <p className="text-xs text-neutral-500">{market.marketDays[0].peakHours}</p>}
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Type</p>
              <p className="font-medium text-neutral-900 mt-0.5">{market.function} • {market.environment}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Vendors</p>
              <p className="font-medium text-neutral-900 mt-0.5">{market.vendorCount}+</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Last Updated</p>
              <p className="font-medium text-neutral-900 mt-0.5">{formatRelativeTime(market.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price Observations */}
          <section className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="p-5 border-b border-neutral-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-600" /> Price Observations
                </h2>
                <span className="text-sm text-neutral-500">{priceStats.count} reports</span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Community-reported prices. Verify independently before making decisions.</p>
            </div>
            <PriceTable observations={market.priceObservations} />
            <div className="p-4 border-t border-neutral-100 bg-neutral-50">
              <Link to="/contribute" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
                <Camera className="w-4 h-4" /> Report a price at this market
              </Link>
            </div>
          </section>

          {/* Commodities */}
          <section className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">Major Commodities</h2>
            <div className="flex flex-wrap gap-2">
              {market.majorCommodities.map(c => (
                <Link key={c} to={`/search?q=${c}`} className="px-3 py-1.5 bg-neutral-100 hover:bg-brand-50 hover:text-brand-700 rounded-full text-sm text-neutral-700 transition-colors">
                  {c.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </section>

          {/* Map placeholder */}
          <section className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="p-5 border-b border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-brand-600" /> Location
              </h2>
            </div>
            <div className="map-container flex items-center justify-center p-8">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-brand-500 mx-auto mb-2" />
                <p className="font-medium text-neutral-700">{market.name}</p>
                <p className="text-sm text-neutral-500 mt-1">{market.nearestSettlement}, {market.state}</p>
                <p className="text-xs text-neutral-400 mt-2">
                  {market.latitude.toFixed(4)}°N, {market.longitude.toFixed(4)}°E
                  {market.locationApproximate && ' (approximate)'}
                </p>
                <p className="text-xs text-neutral-500 mt-3">
                  Nearest major road: {market.nearestMajorRoad}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Market Details */}
          <section className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Market Details</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-neutral-500">Permanence</dt>
                <dd className="font-medium text-neutral-900 capitalize">{market.permanence}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Function</dt>
                <dd className="font-medium text-neutral-900 capitalize">{market.function}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Environment</dt>
                <dd className="font-medium text-neutral-900 capitalize">{market.environment}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Specialization</dt>
                <dd className="font-medium text-neutral-900 capitalize">{market.specialization.replace(/_/g, ' ')}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Wholesale</dt>
                <dd className="font-medium text-neutral-900">{market.wholesaleAvailable ? '✓ Yes' : '✗ No'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-500">Retail</dt>
                <dd className="font-medium text-neutral-900">{market.retailAvailable ? '✓ Yes' : '✗ No'}</dd>
              </div>
              {market.minimumPurchase && (
                <div className="flex justify-between">
                  <dt className="text-neutral-500">Min. Purchase</dt>
                  <dd className="font-medium text-neutral-900 text-right">{market.minimumPurchase}</dd>
                </div>
              )}
            </dl>
          </section>

          {/* Accessibility */}
          <section className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Accessibility</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <dt className="text-neutral-500">Vehicle Access</dt>
                <dd className="font-medium text-neutral-900">{market.vehicleAccess ? '✓ Yes' : '✗ No'}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-neutral-500">Road Condition</dt>
                <dd className={`font-medium ${getRoadConditionColor(market.roadCondition)}`}>
                  {getRoadConditionLabel(market.roadCondition)}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-neutral-500">Mobile Network</dt>
                <dd className="font-medium text-neutral-900 capitalize">{market.mobileNetwork}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-neutral-500">Electricity</dt>
                <dd className="font-medium text-neutral-900">{market.electricity ? '✓ Available' : '✗ Not available'}</dd>
              </div>
            </dl>
          </section>

          {/* Activity Timeline */}
          <section className="bg-white rounded-xl border border-neutral-200 p-5">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-neutral-700">Activity report received</p>
                  <p className="text-xs text-neutral-500">{formatRelativeTime(market.lastActivityReport)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-neutral-700">Price observations updated</p>
                  <p className="text-xs text-neutral-500">{formatRelativeTime(market.lastPriceUpdate)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-neutral-700">{market.reportCount} community reports</p>
                  <p className="text-xs text-neutral-500">{market.photoCount} photos contributed</p>
                </div>
              </div>
            </div>
          </section>

          {/* Report/Correct */}
          <section className="bg-brand-50 rounded-xl border border-brand-200 p-5">
            <h3 className="font-semibold text-brand-800 mb-2">Help improve this listing</h3>
            <p className="text-sm text-brand-700 mb-3">Is this information outdated or incorrect? Community contributions keep Pheeline accurate.</p>
            <Link to="/contribute" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors text-sm">
              <FileText className="w-4 h-4" /> Submit Update
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || p.subcategory.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Products & Commodities</h1>
          <p className="text-neutral-500 mt-1">Browse agricultural produce, food items, livestock and more</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${!selectedCategory ? 'bg-brand-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.slug ? 'bg-brand-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-neutral-700">No products found</h3>
          <p className="text-neutral-500 mt-1">Try a different category</p>
        </div>
      )}
    </div>
  );
}

function MapPage() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Map Controls */}
      <div className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-neutral-900">Map View</h1>
          <span className="text-sm text-neutral-500">{markets.length} markets</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/markets" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg> List View
          </Link>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 flex relative">
        {/* Map */}
        <div className="flex-1 map-container relative">
          {/* Stylized map with market markers */}
          <div className="absolute inset-0 p-4">
            <div className="relative w-full h-full">
              {/* Nigeria outline hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <svg viewBox="0 0 400 400" className="w-full h-full max-w-lg">
                  <path d="M150,50 C200,30 280,40 320,80 C350,110 370,160 360,200 C350,250 330,280 300,310 C270,340 230,360 190,350 C150,340 120,310 100,280 C80,250 70,210 80,170 C90,130 110,80 150,50 Z" fill="currentColor" className="text-brand-600" />
                </svg>
              </div>

              {/* Market markers */}
              {markets.map(market => {
                const x = ((market.longitude - 2.5) / 12) * 100;
                const y = ((14 - market.latitude) / 10) * 100;
                return (
                  <button
                    key={market.id}
                    onClick={() => setSelectedMarket(market)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 ${
                      selectedMarket?.id === market.id ? 'z-20' : ''
                    }`}
                    style={{ left: `${Math.min(95, Math.max(5, x))}%`, top: `${Math.min(95, Math.max(5, y))}%` }}
                    aria-label={`${market.name} - ${market.nearestSettlement}`}
                  >
                    <div className={`relative ${selectedMarket?.id === market.id ? 'scale-125' : 'hover:scale-110'} transition-transform`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${
                        market.activityStatus === 'ACTIVE_NOW' ? 'bg-green-500' :
                        market.activityStatus === 'ACTIVE_TODAY' ? 'bg-green-400' :
                        market.activityStatus === 'RECENTLY_ACTIVE' ? 'bg-blue-400' :
                        'bg-neutral-400'
                      }`}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                        <div className="bg-neutral-900 text-white text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-xl">
                          <p className="font-medium">{market.name}</p>
                          <p className="text-neutral-300">{market.state}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        {selectedMarket && (
          <div className="w-80 bg-white border-l border-neutral-200 overflow-y-auto hidden md:block">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-bold text-neutral-900">{selectedMarket.name}</h2>
                <button onClick={() => setSelectedMarket(null)} className="p-1 rounded hover:bg-neutral-100" aria-label="Close panel">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-neutral-500 flex items-center gap-1 mb-2">
                <MapPin className="w-3.5 h-3.5" /> {selectedMarket.nearestSettlement}, {selectedMarket.state}
              </p>
              <ActivityBadge status={selectedMarket.activityStatus} />
              <p className="text-sm text-neutral-600 mt-3 line-clamp-3">{selectedMarket.description}</p>
              <div className="mt-3 pt-3 border-t border-neutral-100 space-y-2 text-sm">
                <p className="text-neutral-500"><span className="font-medium text-neutral-700">Market Days:</span> {getMarketDayText(selectedMarket.marketDays[0])}</p>
                <p className="text-neutral-500"><span className="font-medium text-neutral-700">Vendors:</span> {selectedMarket.vendorCount}+</p>
                <p className="text-neutral-500"><span className="font-medium text-neutral-700">Type:</span> {selectedMarket.function} • {selectedMarket.environment}</p>
              </div>
              <Link to={`/markets/${selectedMarket.slug}`} className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors text-sm">
                View Full Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile market list */}
      {selectedMarket && (
        <div className="md:hidden bg-white border-t border-neutral-200 p-4">
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-bold text-neutral-900">{selectedMarket.name}</h2>
            <button onClick={() => setSelectedMarket(null)} className="p-1 rounded hover:bg-neutral-100" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-neutral-500">{selectedMarket.nearestSettlement}, {selectedMarket.state}</p>
          <div className="mt-2"><ActivityBadge status={selectedMarket.activityStatus} /></div>
          <Link to={`/markets/${selectedMarket.slug}`} className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-600 text-white font-medium rounded-lg text-sm">
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query) return { markets: [], products: [], vendors: [] };
    const q = query.toLowerCase();
    return {
      markets: markets.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.aliases.some(a => a.toLowerCase().includes(q)) ||
        m.state.toLowerCase().includes(q) ||
        m.lga.toLowerCase().includes(q) ||
        m.majorCommodities.some(c => c.toLowerCase().includes(q)) ||
        m.description.toLowerCase().includes(q)
      ),
      products: products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.aliases.some(a => a.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q)
      ),
      vendors: vendors.filter(v =>
        v.displayName.toLowerCase().includes(q) ||
        v.products.some(p => p.toLowerCase().includes(q)) ||
        v.state.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  const totalResults = results.markets.length + results.products.length + results.vendors.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="search"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search markets, products, commodities, vendors, locations..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-neutral-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent shadow-sm"
            aria-label="Search"
            autoFocus
          />
        </div>
      </form>

      {query && (
        <>
          <p className="text-sm text-neutral-500 mb-6">
            {totalResults} results for "<span className="font-medium text-neutral-700">{query}</span>"
          </p>

          {/* Markets Results */}
          {results.markets.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <Store className="w-5 h-5 text-brand-600" /> Markets ({results.markets.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.markets.map(m => <MarketCard key={m.id} market={m} />)}
              </div>
            </section>
          )}

          {/* Products Results */}
          {results.products.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <Package className="w-5 h-5 text-earth-600" /> Products ({results.products.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}

          {/* Vendors Results */}
          {results.vendors.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-gold-600" /> Vendors ({results.vendors.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.vendors.map(v => (
                  <div key={v.id} className="bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-neutral-900">{v.displayName}</h3>
                        <p className="text-sm text-neutral-500">{v.category} • {v.state}</p>
                      </div>
                      <VerificationBadge status={v.verificationStatus} />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {v.products.slice(0, 4).map(p => (
                        <span key={p} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">{p}</span>
                      ))}
                    </div>
                    {v.rating && (
                      <div className="flex items-center gap-1 mt-2 text-sm">
                        <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                        <span className="font-medium">{v.rating}</span>
                        <span className="text-neutral-400">({v.reviewCount} reviews)</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {totalResults === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-neutral-700">No results found</h3>
              <p className="text-neutral-500 mt-1">Try different keywords or browse our categories</p>
              <Link to="/markets" className="mt-4 inline-flex items-center gap-2 text-brand-600 font-medium">
                Browse all markets <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </>
      )}

      {!query && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-neutral-700">Search Pheeline</h3>
          <p className="text-neutral-500 mt-1">Find markets, products, commodities, vendors and locations across Nigeria</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['cassava', 'rice', 'tomatoes', 'yam', 'livestock', 'textiles', 'Lagos', 'Kano', 'bush market'].map(term => (
              <Link key={term} to={`/search?q=${term}`} className="px-3 py-1.5 bg-neutral-100 hover:bg-brand-50 hover:text-brand-700 rounded-full text-sm text-neutral-700 transition-colors">
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VendorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Vendors</h1>
        <p className="text-neutral-500 mt-1">Discover verified vendors across Nigerian markets</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map(vendor => (
          <div key={vendor.id} className="bg-white rounded-xl border border-neutral-200 overflow-hidden card-hover">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-brand-600" />
                </div>
                <VerificationBadge status={vendor.verificationStatus} />
              </div>
              <h3 className="font-semibold text-neutral-900 text-lg">{vendor.displayName}</h3>
              <p className="text-sm text-neutral-500 mt-0.5">{vendor.category} • {vendor.state}</p>
              <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{vendor.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {vendor.products.slice(0, 3).map(p => (
                  <span key={p} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">{p}</span>
                ))}
                {vendor.products.length > 3 && (
                  <span className="text-xs text-neutral-400">+{vendor.products.length - 3} more</span>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
                <div className="flex items-center gap-1 text-sm">
                  {vendor.rating && (
                    <>
                      <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                      <span className="font-medium">{vendor.rating}</span>
                      <span className="text-neutral-400 text-xs">({vendor.reviewCount})</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  {vendor.wholesale && <span className="badge badge-neutral">Wholesale</span>}
                  {vendor.retail && <span className="badge badge-neutral">Retail</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContributePage() {
  const [reportType, setReportType] = useState('price');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">Report Submitted</h1>
        <p className="text-neutral-600 mt-2">Thank you for your contribution. Your report will be reviewed by our moderation team.</p>
        <p className="text-sm text-neutral-500 mt-4">You'll be notified when your report is verified.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => setSubmitted(false)} className="px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors">
            Submit Another
          </button>
          <Link to="/" className="px-4 py-2 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Contribute</h1>
        <p className="text-neutral-500 mt-1">Help keep Pheeline accurate with your market observations</p>
      </div>

      {/* Report type selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'price', label: 'Report Price', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'market', label: 'Market Info', icon: <Store className="w-4 h-4" /> },
          { id: 'condition', label: 'Condition', icon: <AlertCircle className="w-4 h-4" /> },
          { id: 'correction', label: 'Correction', icon: <FileText className="w-4 h-4" /> },
        ].map(type => (
          <button
            key={type.id}
            onClick={() => setReportType(type.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              reportType === type.id ? 'bg-brand-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {type.icon} {type.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 space-y-5">
        {reportType === 'price' && (
          <>
            <div>
              <label htmlFor="market" className="block text-sm font-medium text-neutral-700 mb-1">Market</label>
              <select id="market" className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent" required>
                <option value="">Select a market...</option>
                {markets.map(m => <option key={m.id} value={m.id}>{m.name} — {m.state}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-neutral-700 mb-1">Product / Commodity</label>
              <select id="product" className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent" required>
                <option value="">Select a product...</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-1">Price (₦)</label>
                <input type="number" id="price" className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent" placeholder="e.g. 85000" required min="0" />
              </div>
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-neutral-700 mb-1">Unit</label>
                <select id="unit" className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent" required>
                  <option value="">Select unit...</option>
                  <option value="kg">kg</option>
                  <option value="bag">bag</option>
                  <option value="sack">sack</option>
                  <option value="basket">basket</option>
                  <option value="mudu">mudu</option>
                  <option value="tuber">tuber</option>
                  <option value="bundle">bundle</option>
                  <option value="piece">piece</option>
                  <option value="crate">crate</option>
                  <option value="paint_rubber">paint rubber</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div>
                <label htmlFor="quality" className="block text-sm font-medium text-neutral-700 mb-1">Quality (optional)</label>
                <select id="quality" className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent">
                  <option value="">Not specified</option>
                  <option value="premium">Premium</option>
                  <option value="good">Good</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </>
        )}

        {reportType === 'condition' && (
          <>
            <div>
              <label htmlFor="cond-market" className="block text-sm font-medium text-neutral-700 mb-1">Market</label>
              <select id="cond-market" className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent" required>
                <option value="">Select a market...</option>
                {markets.map(m => <option key={m.id} value={m.id}>{m.name} — {m.state}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="condition-type" className="block text-sm font-medium text-neutral-700 mb-1">Condition</label>
              <select id="condition-type" className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent" required>
                <option value="">Select condition...</option>
                <option value="crowded">Crowded</option>
                <option value="normal">Normal activity</option>
                <option value="low_activity">Low activity</option>
                <option value="flooding">Flooding</option>
                <option value="traffic">Heavy traffic</option>
                <option value="road_closure">Road closure</option>
                <option value="market_closure">Market closure</option>
                <option value="heavy_supply">Heavy supply</option>
                <option value="low_supply">Low supply</option>
                <option value="poor_road">Poor road condition</option>
              </select>
            </div>
          </>
        )}

        {(reportType === 'market' || reportType === 'correction') && (
          <>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
              <input type="text" id="subject" className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent" placeholder="What are you reporting?" required />
            </div>
          </>
        )}

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1">Notes (optional)</label>
          <textarea id="notes" rows={3} className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none" placeholder="Additional details, observations..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Photo evidence (optional)</label>
          <div className="border-2 border-dashed border-neutral-200 rounded-lg p-6 text-center hover:border-brand-300 transition-colors cursor-pointer">
            <Camera className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm text-neutral-500">Click to upload or drag and drop</p>
            <p className="text-xs text-neutral-400 mt-1">JPG, PNG up to 5MB</p>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200">
          <p className="text-xs text-neutral-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
            <span>Your report will be reviewed by our moderation team. Accurate reports build your contributor reputation. Do not submit fabricated information.</span>
          </p>
        </div>

        <button type="submit" className="w-full px-4 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors">
          Submit Report
        </button>
      </form>
    </div>
  );
}

function TelegramPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">Pheeline Telegram Bot</h1>
        <p className="text-neutral-500 mt-2 max-w-xl mx-auto">Search markets, report prices and get market intelligence directly through Telegram. Uses the same data as our web platform.</p>
        <a href="https://t.me/pheelinemarketplace" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          <ExternalLink className="w-4 h-4" /> Open in Telegram
        </a>
      </div>

      {/* Commands */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="p-5 border-b border-neutral-100">
          <h2 className="text-lg font-bold text-neutral-900">Available Commands</h2>
        </div>
        <div className="divide-y divide-neutral-100">
          {[
            { cmd: '/start', desc: 'Start the bot and see available options' },
            { cmd: '/help', desc: 'Get help and usage information' },
            { cmd: '/search <query>', desc: 'Search markets, products and vendors' },
            { cmd: '/market <name>', desc: 'Get details about a specific market' },
            { cmd: '/price <product>', desc: 'Get recent price observations for a product' },
            { cmd: '/report', desc: 'Report a price or market condition' },
            { cmd: '/vendors', desc: 'Find vendors in a market or area' },
            { cmd: '/near <location>', desc: 'Find markets near a location' },
            { cmd: '/active', desc: 'See which markets are currently active' },
          ].map(item => (
            <div key={item.cmd} className="p-4 flex items-start gap-3">
              <code className="px-2 py-1 bg-neutral-100 rounded text-sm font-mono text-brand-700 flex-shrink-0">{item.cmd}</code>
              <p className="text-sm text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h3 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-600" /> Secure & Private
          </h3>
          <p className="text-sm text-neutral-600">Account linking ensures your contributions are attributed correctly. Your Telegram data is handled securely.</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h3 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-600" /> Same Data
          </h3>
          <p className="text-sm text-neutral-600">The Telegram bot uses the same authoritative database as the website. All reports sync in real-time.</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h3 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
            <Camera className="w-4 h-4 text-brand-600" /> Easy Reporting
          </h3>
          <p className="text-sm text-neutral-600">Report prices and conditions quickly from anywhere. Attach photos directly from your phone camera.</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h3 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-600" /> Future Alerts
          </h3>
          <p className="text-sm text-neutral-600">Coming soon: price alerts, market-day reminders, commodity alerts and saved search notifications.</p>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-6">About Pheeline Market Place</h1>

      <div className="prose prose-neutral max-w-none space-y-8">
        <section className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Our Mission</h2>
          <p className="text-neutral-700 leading-relaxed">
            Pheeline Market Place is a digital market-information and commodity-intelligence network for Nigeria. We help people discover markets, understand prices, find vendors, and make informed decisions about where and when to buy.
          </p>
          <p className="text-neutral-700 leading-relaxed mt-3">
            From urban food markets to rural bush markets, from periodic trading points to wholesale aggregation centres — we capture the reality of Nigerian commerce as it happens, through community observation and verification.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-3">What We Do</h2>
          <ul className="space-y-2 text-neutral-700">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" /> Map and document markets across Nigeria — urban, rural, bush, periodic and seasonal</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" /> Collect and verify price observations from community contributors</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" /> Track market activity, conditions and accessibility</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" /> Maintain market day schedules and trading patterns</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" /> Connect buyers with verified vendors</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" /> Build a trusted, timestamped, provenance-aware market dataset</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Our Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-neutral-800 text-sm">Observational, Not Authoritative</h3>
              <p className="text-sm text-neutral-600 mt-1">Prices are observations, not official rates. We show freshness, source and confidence.</p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 text-sm">Community-Powered</h3>
              <p className="text-sm text-neutral-600 mt-1">Data comes from real people at real markets, with verification and moderation.</p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 text-sm">Privacy-Respecting</h3>
              <p className="text-sm text-neutral-600 mt-1">We protect contributor locations and personal data. Compliance with NDPA.</p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 text-sm">Inclusive of All Markets</h3>
              <p className="text-sm text-neutral-600 mt-1">Bush markets, farm gates and rural trading points are first-class, not afterthoughts.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Important Disclaimers</h2>
          <div className="space-y-3 text-sm text-neutral-700">
            <p>Pheeline Market Place provides community-reported market information. Prices, availability and conditions are observational and may not reflect current reality.</p>
            <p>We do not represent prices as official government rates. We do not guarantee vendor legitimacy, product quality, or market security. Always verify information independently.</p>
            <p>Market information is timestamped and attributed. Check freshness indicators before making decisions based on our data.</p>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-3">Contact</h2>
          <div className="space-y-2 text-sm text-neutral-700">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-neutral-400" /> info@pheelinemarketplace.com</p>
            <p className="flex items-center gap-2"><ExternalLink className="w-4 h-4 text-neutral-400" /> <a href="https://t.me/pheelinemarketplace" className="text-brand-600 hover:underline">Telegram: @pheelinemarketplace</a></p>
            <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-neutral-400" /> pheelinemarketplace.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}

// ============ APP ============

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/markets/:slug" element={<MarketDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/telegram" element={<TelegramPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
              <AlertCircle className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-neutral-900">Page Not Found</h1>
              <p className="text-neutral-500 mt-2">The page you're looking for doesn't exist.</p>
              <Link to="/" className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors">
                Go Home
              </Link>
            </div>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
