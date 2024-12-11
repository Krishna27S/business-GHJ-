import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      await router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoading(false);
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
          <Link 
            href={`/products?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-gray-700 hover:text-red-600 py-4 inline-block text-sm font-medium"
            prefetch={false}
          >
            {category}
          </Link>
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
                        <Link 
                          href={`/products?category=${category.toLowerCase().replace(/\s+/g, '-')}&subcategory=${item.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-gray-600 hover:text-gray-800 text-sm block"
                          prefetch={false}
                        >
                          {item}
                        </Link>
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
              href="https://www.google.com/maps/place/Ginni+house+jewellers/@26.1216362,85.8956459,19.46z"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600"
            >
              STORE LOCATOR
            </a>
            <span>/</span>
            <Link href="/feedback" className="hover:text-red-600">FEEDBACK</Link>
            <span>/</span>
            <Link href="/contact" className="hover:text-red-600">CONTACT</Link>
          </div>

          {/* Account Section */}
          <div className="flex space-x-4">
            {isAdmin ? (
              <div className="flex items-center space-x-4">
                {user?.email && (
                  <span className="text-gray-600">{user.email}</span>
                )}
                <Link 
                  href="/admin/dashboard" 
                  className="hover:text-red-600 transition-colors"
                >
                  DASHBOARD
                </Link>
                <span>/</span>
                <button 
                  onClick={handleLogout} 
                  disabled={isLoading}
                  className="hover:text-red-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'LOGGING OUT...' : 'LOGOUT'}
                </button>
              </div>
            ) : (
              <Link 
                href="/admin" 
                className="hover:text-red-600 transition-colors"
              >
                OWNER?
              </Link>
            )}
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
              <Link href="/">
                <img
                  src="/images/logo2.jpg"
                  alt="Ginni House Logo"
                  className="h-20 w-20 object-contain rounded-full"
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <MenuItems data={rightMenuData} align="right" />
          </div>
        </div>
      </header>

      {/* Add space below the header */}
      <div className="h-12"></div>
    </div>
  );
};

export default Header;