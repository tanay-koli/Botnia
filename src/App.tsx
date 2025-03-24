import React, { useState, useEffect } from 'react';
import { 
  Shirt, 
  Tangent as Pants, 
  Crown, 
  Glasses, 
  Lock as Sock, 
  Bot as Boot, 
  Cat as Hat, 
  Cookie as Hoodie, 
  Shirt as TShirt, 
  Shovel as Shoe,
  ShoppingCart,
  Sparkles,
  PartyPopper
} from 'lucide-react';
import { sendOrderEmail } from './services/emailService';

interface ClothingItem {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  memeReference: string;
  images: string[];
}

function App() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [showSparkle, setShowSparkle] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
  const [showVideo, setShowVideo] = useState(false);
  const [siteClosed, setSiteClosed] = useState(false);

  useEffect(() => {
    if (selectedItems.length === 2) {
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1000);
    }
  }, [selectedItems]);

  useEffect(() => {
    if (hoveredItem !== null) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => {
          const currentIndex = prev[hoveredItem] || 0;
          const nextIndex = (currentIndex + 1) % (clothingItems.find(item => item.id === hoveredItem)?.images.length || 1);
          return { ...prev, [hoveredItem]: nextIndex };
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [hoveredItem]);

  const clothingItems: ClothingItem[] = [
    {
      id: 1,
      name: "Malibu Linen Oversized Shirt",
      icon: <Shirt className="w-8 h-8" />,
      description: "Elegant and comfortable linen shirt",
      memeReference: "Malibu",
      images: [
        "./images/Malibu Linen Oversized Shirt.webp",
        "./images/Malibu Linen Oversized Shirt_2.webp"
      ]
    },
    {
      id: 2,
      name: "Serina Oversized Shirt",
      icon: <Shirt className="w-8 h-8" />,
      description: "Classic oversized fit",
      memeReference: "Serina",
      images: [
        "./images/Serina Oversized Shirt.webp",
        "./images/Serina Oversized Shirt_2.webp"
      ]
    },
    {
      id: 3,
      name: "Co-Ord Set",
      icon: <TShirt className="w-8 h-8" />,
      description: "Matching set for a coordinated look",
      memeReference: "Co-Ord",
      images: [
        "./images/Co-Ord Set.webp"
      ]
    },
    {
      id: 4,
      name: "Black Co-Ord Set",
      icon: <TShirt className="w-8 h-8" />,
      description: "Classic black matching set",
      memeReference: "Black Co-Ord",
      images: [
        "./images/Black Co-Ord Set.webp"
      ]
    },
    {
      id: 5,
      name: "Pink Oversized Shirt",
      icon: <Shirt className="w-8 h-8" />,
      description: "Soft pink oversized style",
      memeReference: "Pink",
      images: [
        "./images/Pink Oversized Shirt.webp"
      ]
    },
    {
      id: 6,
      name: "Blue Pinstripe Oversized Shirt",
      icon: <Shirt className="w-8 h-8" />,
      description: "Classic pinstripe pattern",
      memeReference: "Blue Pinstripe",
      images: [
        "./images/Blue_Pinstripe Oversized Shirt.webp",
        "./images/Blue Pinstripe Oversized Shirt_2.webp"
      ]
    },
    {
      id: 7,
      name: "Co-ord Blue Overalls",
      icon: <Pants className="w-8 h-8" />,
      description: "Stylish blue overalls",
      memeReference: "Blue Overalls",
      images: [
        "./images/Co-ord Blue Overalls.webp"
      ]
    }
  ];

  const toggleItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else if (selectedItems.length < 2) {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 2) {
      // Store the selected items data
      const orderData = {
        timestamp: new Date().toISOString(),
        items: selectedItemsDetails
          .filter((item): item is NonNullable<typeof item> => item !== undefined)
          .map(item => ({
            id: item.id,
            name: item.name,
            description: item.description
          }))
      };

      // Send email with order data
      const emailSent = await sendOrderEmail(orderData);
      
      // Show video immediately
      setShowVideo(true);
      
      // After video ends (approximately 3 minutes), show closing message
      setTimeout(() => {
        setShowVideo(false);
        setSiteClosed(true);
      }, 180000); // 3 minutes in milliseconds
    }
  };

  const selectedItemsDetails = selectedItems.map(id => 
    clothingItems.find(item => item.id === id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8 relative overflow-hidden">
      {showSparkle && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-32 h-32 text-yellow-300 animate-spin" />
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10"></div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-bounce">
            🎭 No More Hints 🎭
          </h1>
          <p className="text-xl text-white opacity-90 transform hover:scale-105 transition-transform">
            Choose 2 items for your new drip
          </p>
          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block transform hover:scale-105 transition-all duration-300">
            <p className="text-lg text-white font-semibold">
              Selected: {selectedItems.length}/2 items
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clothingItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => {
                setHoveredItem(null);
                setCurrentImageIndex(prev => ({ ...prev, [item.id]: 0 }));
              }}
              className={`
                bg-white/90 backdrop-blur-sm rounded-xl p-6 cursor-pointer transform transition-all duration-300
                hover:scale-105 hover:shadow-xl relative overflow-hidden
                ${selectedItems.includes(item.id) ? 'ring-4 ring-yellow-400 shadow-lg scale-105' : ''}
                ${hoveredItem === item.id ? 'shadow-2xl' : ''}
                group
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative overflow-hidden rounded-lg h-96">
                {item.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${item.name} view ${index + 1}`}
                    className={`
                      absolute inset-0 w-full h-full object-contain transition-all duration-500
                      ${(currentImageIndex[item.id] || 0) === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                    `}
                  />
                ))}
                <div className={`
                  absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full z-10
                  transform transition-all duration-300
                  ${selectedItems.includes(item.id) ? 'scale-110 bg-yellow-400' : 'scale-100'}
                  ${hoveredItem === item.id ? 'scale-110' : ''}
                `}>
                  {selectedItems.includes(item.id) ? (
                    <Sparkles className="w-6 h-6 text-white" />
                  ) : (
                    <ShoppingCart className="w-6 h-6 text-gray-600" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1 group-hover:text-purple-500 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedItems.length === 2 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={handleCheckout}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full
                shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300
                flex items-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Checkout (2/2)</span>
            </button>
          </div>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 animate-bounce">
              <div className="text-center">
                <PartyPopper className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Received!</h3>
                <p className="text-gray-600 mb-6">
                  Selected items:
                </p>
                <div className="space-y-2">
                  {selectedItemsDetails.map((item) => (
                    <div key={item?.id} className="flex items-center justify-center space-x-2">
                      <span className="text-gray-800">{item?.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Order will be processed shortly
                </p>
              </div>
            </div>
          </div>
        )}

        {showVideo && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="w-full max-w-4xl aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/8ScAnaU0FFE?autoplay=1&controls=0&modestbranding=1"
                title="Thank You Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        )}

        {siteClosed && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
              <p className="text-xl">The site will now close.</p>
              <button
                onClick={() => window.close()}
                className="mt-8 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;