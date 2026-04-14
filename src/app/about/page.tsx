import Image from 'next/image';
import Link from 'next/link';
import { FaStore, FaDollarSign, FaShoppingBag, FaMoneyBillWave } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { RiCustomerService2Line } from 'react-icons/ri';
import { GoShieldCheck } from 'react-icons/go';

export default function AboutPage() {
  const stats = [
    { icon: <FaStore size={28} />, value: '10.5k', label: 'Sellers active on our site' },
    { icon: <FaDollarSign size={28} />, value: '33k', label: 'Monthly product sales' },
    { icon: <FaShoppingBag size={28} />, value: '45.5k', label: 'Customers active on our site' },
    { icon: <FaMoneyBillWave size={28} />, value: '25k', label: 'Annual gross sale on our site' },
  ];

  const team = [
    { name: 'Tom Cruise', role: 'Founder & Chairman', image: '/images/image 57.png' },
    { name: 'Emma Watson', role: 'Managing Director', image: '/images/image 58.png' },
    { name: 'Will Smith', role: 'Product Designer', image: '/images/image 59.png' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">About</span>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-6">Our Story</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            Launched in 2015, Exclusive is South Asia&apos;s premier online shopping marketplace
            with an active presence in Bangladesh. Supported by a wide range of tailored marketing,
            data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3
            million customers across the region.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Exclusive has more than 1 million products to offer, growing at a very fast rate.
            Exclusive offers a diverse assortment in categories ranging from consumer electronics
            to fashion, beauty, home &amp; garden, sports, and more.
          </p>
        </div>
        <div className="relative rounded-lg overflow-hidden min-h-[400px]">
          <Image
            src="/images/Side Image.png"
            alt="About Exclusive"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-6 text-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group cursor-default"
          >
            <div className="w-16 h-16 bg-gray-200 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-black group-hover:bg-white/30 rounded-full flex items-center justify-center text-white group-hover:text-white">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">{stat.value}</h3>
            <p className="text-sm mt-1 opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="bg-secondary rounded-lg overflow-hidden mb-4 relative aspect-[3/4]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain object-bottom"
                />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        {[
          {
            icon: <TbTruckDelivery size={32} />,
            title: 'FREE AND FAST DELIVERY',
            desc: 'Free delivery for all orders over $140',
          },
          {
            icon: <RiCustomerService2Line size={32} />,
            title: '24/7 CUSTOMER SERVICE',
            desc: 'Friendly 24/7 customer support',
          },
          {
            icon: <GoShieldCheck size={32} />,
            title: 'MONEY BACK GUARANTEE',
            desc: 'We return money within 30 days',
          },
        ].map((service) => (
          <div key={service.title} className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                {service.icon}
              </div>
            </div>
            <h3 className="font-bold text-sm">{service.title}</h3>
            <p className="text-gray-500 text-xs">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
