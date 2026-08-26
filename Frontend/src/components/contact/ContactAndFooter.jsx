    function ContactAndFooter() {
      return (
        <footer id="contact" className="bg-[var(--bg-main)] border-t border-[var(--border-color)] pt-20 pb-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-primary)] font-bold">
                CONNECT DIRECTLY
              </span>
              <h3 className="text-3xl font-display font-extrabold">LEENA SAJJA</h3>
              <p className="text-sm opacity-80 max-w-sm">
                Professional Yoga Trainer at Cult & National Silver Medalist. Available for 1-on-1 private sessions, corporate workshops, and online classes.
              </p>

              <div className="space-y-3 text-sm opacity-90 pt-2">
                <p className="flex items-center gap-3">
                  <span className="text-[var(--accent-gold)]">📍</span> Cult Center / Private Studio
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[var(--accent-gold)]">📧</span> leena.sajja.yoga@gmail.com
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[var(--accent-gold)]">📱</span> +91 98765 43210
                </p>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="lg:col-span-7 bg-[var(--card-bg)] p-8 rounded-3xl border border-[var(--border-color)] shadow-xl">
              <h4 className="font-display font-bold text-xl mb-6">SEND A DIRECT MESSAGE</h4>
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Leena will respond shortly.'); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" required className="w-full px-5 py-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent-gold)]" />
                  <input type="email" placeholder="Your Email" required className="w-full px-5 py-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent-gold)]" />
                </div>
                <input type="tel" placeholder="Phone Number" className="w-full px-5 py-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent-gold)]" />
                <textarea rows="3" placeholder="Tell Leena about your practice goals..." required className="w-full px-5 py-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent-gold)]"></textarea>
                <button type="submit" className="w-full py-3.5 rounded-2xl bg-[var(--text-main)] text-[var(--bg-main)] font-display font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all">
                  SEND MESSAGE
                </button>
              </form>
            </div>

          </div>

          <div className="max-w-7xl mx-auto pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between text-xs opacity-60 gap-4">
            <p>© 2026 LEENA SAJJA. ALL RIGHTS RESERVED.</p>
            <p>YOGA • MOVEMENT • WELLNESS</p>
          </div>
        </footer>
      );
    }
export default ContactAndFooter;