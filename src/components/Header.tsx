/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from 'react';

interface MenuSection {
  [key: string]: string[];
}

interface MenuData {
  [key: string]: MenuSection;
}

interface MenuItemsProps {
  data: MenuData;
  align: 'left' | 'right';
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const leftMenuData: MenuData = {
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
      ]
    }
  };

  const rightMenuData: MenuData = {
    'GOLD': {
      'CATEGORY': [
        'BANGLES',
        'BRACELETS',
        'EARRINGS',
        'GOLD CHAINS',
        'PENDANTS',
        'RINGS'
      ],
      'GOLD COIN': [
        '1 GRAM',
        '2 GRAM',
        '4 GRAM',
        '8 GRAM',
        '10 GRAM'
      ]
    },
    'SILVER': {
      'CATEGORY': [
        'BANGLES',
        'BRACELETS',
        'EARRINGS',
        'CHAINS',
        'PENDANTS',
        'RINGS'
      ],
      'SILVER COIN': [
        '1 GRAM',
        '2 GRAM',
        '4 GRAM',
        '8 GRAM',
        '10 GRAM'
      ]
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const MenuItems: React.FC<MenuItemsProps> = ({ data, align }) => (
    <nav className="flex space-x-8">
      {Object.entries(data).map(([category, sections]) => (
        <div key={category} className="group relative">
          <a 
            href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-gray-700 hover:text-red-600 py-4 inline-block text-sm font-medium"
          >
            {category}
          </a>
          <div 
            className={`absolute ${align === 'left' ? 'left-0' : 'right-0'} top-full bg-white shadow-lg invisible 
              group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-[100] min-w-[200px] p-6`}
          >
            <div className="flex gap-8 whitespace-nowrap">
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
        </div>
      ))}
    </nav>
  );

  return (
    <div className="relative z-[60]">
      {/* Top Bar */}
      <div className="bg-[#FAF3E3] text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <a 
              href="https://www.google.com/maps/place/Ginni+house+jewellers/@26.1216362,85.8956459,19.46z/data=!4m14!1m7!3m6!1s0x39edb9731f966623:0x8bfc3e6d7a1b1126!2sGinni+house+jewellers!8m2!3d26.1217797!4d85.8960025!16s%2Fg%2F11rv0h0srb!3m5!1s0x39edb9731f966623:0x8bfc3e6d7a1b1126!8m2!3d26.1217797!4d85.8960025!16s%2Fg%2F11rv0h0srb"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600"
            >
              STORE LOCATOR
            </a>
            <span>/</span>
            <a href="/feedback" className="hover:text-red-600">FEEDBACK</a>
            <span>/</span>
            <a href="/contact" className="hover:text-red-600">CONTACT</a>
          </div>

          {/* Account Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-red-600">
              <span>My Account</span>
              <svg 
                className="w-4 h-4 group-hover:transform group-hover:rotate-180 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
              <a href="/admin" className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium text-red-600">ADMIN</a>
              <a href="/logout" className="block px-4 py-2 hover:bg-gray-100 text-sm">Logout</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 w-full bg-white shadow-lg transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between relative">
            {/* Left Navigation */}
            <MenuItems data={leftMenuData} align="left" />

            {/* Center Logo */}
            <div 
              className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                scrolled ? 'scale-75' : 'scale-100'
              }`}
            >
              <img
                src="/images/logo2.jpg"
                alt="Ginni House Logo"
                className="h-20 w-20 object-contain rounded-full"
              />
            </div>

            {/* Right Navigation */}
            <MenuItems data={rightMenuData} align="right" />
          </div>

          {/* Search Bar - Shown when scrolled */}
          <div 
            className={`overflow-hidden transition-all duration-300 ${
              scrolled ? 'h-12 opacity-100 mt-2' : 'h-0 opacity-0'
            }`}
          >
            <div className="relative z-[70]">
              <input
                type="text"
                placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <svg 
                className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;