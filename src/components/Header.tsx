/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';

const Header = () => {
  const menuData = {
    'ALL JEWELLERY': {
      'CATEGORY': [
        'BANGLES',
        'BRACELETS',
        'EARRINGS',
        'GOLD CHAINS',
        'PENDANTS',
        'RINGS',
        'NECKLACES',
        'NOSE PINS'
      ],
      'EARRINGS': [
        'DROP EARRINGS',
        'HOOP EARRINGS',
        'JHUMKAS',
        'STUD EARRINGS'
      ],
      'RINGS': [
        'ENGAGEMENT RINGS'
      ],
      'PENDANTS': [
        'CASUAL WEAR',
        'DAILY WEAR',
        'PARTY WEAR',
        'PENDANTS & EARRINGS SET',
        'TRADITIONAL'
      ],
      'PRICE': [
        '<25K',
        '25K - 50K',
        '50K - 1L',
        '1L & ABOVE'
      ]
    },
    'EARRINGS': {
      'STYLE': [
        'ALL EARRINGS',
        'DROP & DANGLERS',
        'HOOP & HUGGIES',
        'JHUMKAS',
        'STUDS & TOPS'
      ],
      'METAL & STONES': [
        'DIAMOND',
        'GEMSTONE',
        'GOLD',
        'PLATINUM METAL',
        'ROSE GOLD'
      ],
      'OCCASION': [
        'CASUAL WEAR',
        'MODERN',
        'TRADITIONAL',
        'WEDDING',
        'WORK WEAR'
      ],
      'PRICE': [
        '<25K',
        '25K-50K',
        '50K-1L',
        '1L & ABOVE'
      ],
      'GENDER': [
        'WOMEN\'S EARRINGS',
        'KIDS & TEENS'
      ]
    },
    'RINGS': {
      'ALL RINGS': [
        'CASUAL RINGS',
        'COUPLE RINGS',
        'DIAMOND ENGAGEMENT RINGS',
        'ENGAGEMENT RINGS',
        'GOLD ENGAGEMENT RINGS',
        'MEN\'S RINGS',
        'PLATINUM ENGAGEMENT RINGS'
      ],
      'BY METAL & STONES': [
        'DIAMOND',
        'GEMSTONE',
        'GOLD',
        'ROSE GOLD',
        'SOLITAIRE',
        'WHITE GOLD'
      ],
      'PRICE RANGE': [
        '<25K',
        '25K-50K',
        '50K-1L',
        '1L & ABOVE'
      ]
    },
    'GOLD': {
      'CATEGORY': [
        'BANGLES',
        'BRACELETS',
        'EARRINGS',
        'GOLD CHAINS',
        'PENDANTS',
        'RINGS',
        'ENGAGEMENT RINGS',
        'NECKLACES'
      ],
      'EARRINGS TYPE': [
        'JHUMKAS',
        'HOOP EARRINGS',
        'STUD EARRINGS',
        'DROP EARRINGS'
      ],
      'MEN': [
        'BRACELETS',
        'CHAINS',
        'RINGS'
      ],
      'GOLD COIN': [
        '1 GRAM',
        '2 GRAM',
        '4 GRAM',
        '8 GRAM',
        '10 GRAM'
      ]
    }
  };

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Left Logo */}
          <a href="/" className="text-2xl font-serif text-gray-800">
            Ginni House 
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <svg className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>

          {/* Right Logo */}
          <div className="h-16 w-16">
            <img
              src="/images/logo2.jpg" // Add your logo to the public folder
              alt="Ginni House Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Main Navigation with Dropdowns */}
        <nav className="py-4 border-t border-gray-200">
          <ul className="flex space-x-6">
            {Object.entries(menuData).map(([category, sections]) => (
              <li key={category} className="group relative">
                <a href={`/${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-700 hover:text-red-800 py-2 inline-block text-sm whitespace-nowrap">
                  {category}
                </a>
                {/* Mega Menu Dropdown */}
                <div className="absolute left-0 top-full bg-white shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 min-w-[200px] p-6">
                  <div className="flex gap-8">
                    {Object.entries(sections).map(([sectionTitle, items]) => (
                      <div key={sectionTitle} className="min-w-[150px]">
                        <h3 className="text-red-800 font-semibold mb-3 text-sm">{sectionTitle}</h3>
                        <ul className="space-y-2">
                          {items.map((item) => (
                            <li key={item}>
                              <a 
                                href={`/${category.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-gray-600 hover:text-gray-800 text-sm block"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;