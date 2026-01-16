import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, BookOpen, TrendingUp, Users, Award, Mail, Phone, MapPin, Check } from 'lucide-react';

const SATMathWebsite = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.level) {
      alert('გთხოვთ შეავსოთ ყველა სავალდებულო ველი');
      return;
    }

    const mailtoLink = `mailto:your-email@example.com?subject=SAT Math Registration - ${formData.name}&body=სახელი: ${formData.name}%0D%0Aელ.ფოსტა: ${formData.email}%0D%0Aტელეფონი: ${formData.phone}%0D%0Aდონე: ${formData.level}%0D%0Aშეტყობინება: ${formData.message}`;

    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        .float { animation: float 6s ease-in-out infinite; }
        .float-delayed { animation: float 6s ease-in-out 2s infinite; }
        .fade-in { opacity: 0; transform: translateY(30px); transition: all 0.8s ease; }
        .fade-in.animate-in { opacity: 1; transform: translateY(0); }
        .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .glow-card:hover { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4); transform: translateY(-5px); }
        .cube-3d {
          transform-style: preserve-3d;
          animation: rotate3d 20s linear infinite;
        }
        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            SAT Math Pro
          </div>

          <div className="hidden md:flex gap-8">
            {['მთავარი', 'კურსები', 'ჩვენს შესახებ', 'რეგისტრაცია'].map((item, i) => (
              <a key={i} href={`#${['home', 'courses', 'about', 'register'][i]}`}
                className="hover:text-blue-400 transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass mt-4 py-4 px-4 space-y-4">
            {['მთავარი', 'კურსები', 'ჩვენს შესახებ', 'რეგისტრაცია'].map((item, i) => (
              <a key={i} href={`#${['home', 'courses', 'about', 'register'][i]}`}
                className="block hover:text-blue-400 transition-colors"
                onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500 rounded-full opacity-20 blur-3xl float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cube-3d opacity-10">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-600 to-cyan-600"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            SAT Math<br />სრულყოფილი მომზადება
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            მიაღწიე შენს მაქსიმალურ ქულას პროფესიონალი ინსტრუქტორების დახმარებით
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              დაიწყე ახლავე
            </a>
            <a href="#courses" className="px-8 py-4 glass rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              გაიგე მეტი
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'სრული პროგრამა', desc: 'SAT Math-ის ყველა თემა დეტალურად' },
              { icon: Users, title: 'ინდივიდუალური მიდგომა', desc: 'პერსონალური სასწავლო გეგმა' },
              { icon: TrendingUp, title: 'სწრაფი პროგრესი', desc: 'შედეგი 2-3 თვეში' },
              { icon: Award, title: 'გარანტირებული წარმატება', desc: '95%+ სტუდენტებს აქვთ 700+ ქულა' }
            ].map((feature, i) => (
              <div key={i} className="fade-in glass p-6 rounded-2xl glow-card transition-all duration-300">
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 fade-in">ჩვენი კურსები</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'საწყისი დონე', price: '200₾/თვე', features: ['ძირითადი თემები', '8 გაკვეთილი თვეში', 'პრაქტიკული ტესტები', 'ონლაინ რესურსები'] },
              { name: 'საშუალო დონე', price: '300₾/თვე', features: ['მოწინავე თემები', '12 გაკვეთილი თვეში', 'უზრუნველყოფილი მასალები', 'პირადი კონსულტაცია'], popular: true },
              { name: 'ინტენსიური', price: '450₾/თვე', features: ['მთელი პროგრამა', '16 გაკვეთილი თვეში', 'ინდივიდუალური მეთოდები', '24/7 მხარდაჭერა'] }
            ].map((course, i) => (
              <div key={i} className={`fade-in glass p-8 rounded-2xl ${course.popular ? 'ring-2 ring-blue-500 scale-105' : ''} hover:scale-105 transition-all duration-300`}>
                {course.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                    პოპულარული
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{course.name}</h3>
                <div className="text-4xl font-bold text-blue-400 mb-6">{course.price}</div>
                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#register" className="block w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-center font-semibold hover:shadow-xl transition-all duration-300">
                  აირჩიე კურსი
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">რატომ ჩვენ?</h2>
              <p className="text-gray-300 text-lg mb-6">
                ჩვენ ვართ SAT Math მომზადების სპეციალისტები 8+ წლიანი გამოცდილებით. ჩვენი პროგრამა აერთიანებს თანამედროვე სწავლების მეთოდებს და ინდივიდუალურ მიდგომას.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">სერტიფიცირებული პედაგოგები</h3>
                    <p className="text-gray-400">ყველა ინსტრუქტორი გადის რეგულარულ ტრენინგს</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">დამტკიცებული შედეგები</h3>
                    <p className="text-gray-400">ჩვენი სტუდენტები აღწევენ საშუალოდ 750+ ქულას</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fade-in relative">
              <div className="glass p-8 rounded-2xl">
                <div className="text-6xl font-bold text-blue-400 mb-2">500+</div>
                <p className="text-xl text-gray-300 mb-4">წარმატებული სტუდენტი</p>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 w-[95%]"></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">95% წარმატების მაჩვენებელი</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-20 px-4 bg-black/20">
        <div className="max-w-3xl mx-auto">
          <div className="fade-in text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">დარეგისტრირდი ახლავე</h2>
            <p className="text-gray-300 text-lg">შეავსე ფორმა და ჩვენ დაგიკავშირდებით 24 საათში</p>
          </div>

          <div className="fade-in glass p-8 rounded-2xl space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">სახელი და გვარი *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="თქვენი სახელი"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">ელ. ფოსტა *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">ტელეფონი *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+995 555 123 456"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">დონე *</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">აირჩიე დონე</option>
                <option value="beginner">საწყისი</option>
                <option value="intermediate">საშუალო</option>
                <option value="advanced">მაღალი</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">დამატებითი ინფორმაცია</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="მოგვიყევით თქვენი მიზნების შესახებ..."
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              გაგზავნა
            </button>

            {submitted && (
              <div className="text-center text-green-400 font-semibold">
                ✓ მესიჯი გაიგზავნა წარმატებით!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                SAT Math Pro
              </h3>
              <p className="text-gray-400">
                შენი წარმატება SAT-ში იწყება აქ
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">კონტაქტი</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>info@satmathpro.ge</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>+995 555 123 456</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>თბილისი, საქართველო</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">სწრაფი ბმულები</h4>
              <div className="space-y-2">
                {['მთავარი', 'კურსები', 'ჩვენს შესახებ', 'რეგისტრაცია'].map((item, i) => (
                  <a key={i} href={`#${['home', 'courses', 'about', 'register'][i]}`}
                    className="block text-gray-400 hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 pt-8 border-t border-white/10">
            © 2026 SAT Math Pro. ყველა უფლება დაცულია.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SATMathWebsite;
