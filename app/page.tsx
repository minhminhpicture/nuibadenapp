"use client";

import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  CloudSun,
  Compass,
  Headphones,
  Heart,
  Home,
  Info,
  Map,
  MapPin,
  Minus,
  Mountain,
  Navigation,
  Phone,
  Plus,
  QrCode,
  Search,
  Share,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  SunMedium,
  Ticket,
  TrainFront,
  UserRound,
  UtensilsCrossed,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Screen =
  | "home"
  | "tickets"
  | "schedule"
  | "routes"
  | "wallet"
  | "guide"
  | "support"
  | "offers";

type TicketType = {
  id: string;
  name: string;
  subtitle: string;
  adult: number;
  child: number;
  nightAdult?: number;
  nightChild?: number;
  icon: typeof Mountain;
  accent: string;
};

const ticketTypes: TicketType[] = [
  {
    id: "summit",
    name: "Đỉnh Vân Sơn",
    subtitle: "Khứ hồi · Đỉnh núi 986m",
    adult: 450000,
    child: 350000,
    nightAdult: 300000,
    nightChild: 200000,
    icon: Mountain,
    accent: "green",
  },
  {
    id: "pagoda",
    name: "Chùa Hang",
    subtitle: "Khứ hồi · Viếng Chùa Bà",
    adult: 250000,
    child: 150000,
    nightAdult: 150000,
    nightChild: 100000,
    icon: Sparkles,
    accent: "gold",
  },
  {
    id: "combo",
    name: "Combo Đỉnh + Chùa",
    subtitle: "Trọn vẹn cả hai tuyến",
    adult: 650000,
    child: 500000,
    nightAdult: 400000,
    nightChild: 300000,
    icon: Ticket,
    accent: "blue",
  },
];

const routes = [
  {
    id: "van-son",
    name: "Tuyến Vân Sơn",
    kicker: "Chinh phục đỉnh 986m",
    time: "8 phút",
    distance: "1.847m",
    station: "Ga Bà Đen → Ga Vân Sơn",
    image: "/images/van-son.jpg",
    description:
      "Vượt qua mây ngàn lên thẳng đỉnh núi, chiêm bái Tượng Phật Bà Tây Bổ Đà Sơn và khám phá không gian triển lãm Phật giáo.",
  },
  {
    id: "chua-hang",
    name: "Tuyến Chùa Hang",
    kicker: "Hành trình tâm linh",
    time: "5 phút",
    distance: "1.210m",
    station: "Ga Bà Đen → Ga Chùa Hang",
    image: "/images/phat-ba-dem.jpg",
    description:
      "Đưa du khách đến quần thể Chùa Bà linh thiêng, Chùa Hang và Điện Bà giữa không gian núi rừng thanh tịnh.",
  },
  {
    id: "tam-an",
    name: "Tuyến Tâm An",
    kicker: "Kết nối đỉnh và khu chùa",
    time: "5 phút",
    distance: "1.208m",
    station: "Ga Hòa Đồng → Ga Tâm An",
    image: "/images/tam-an.jpg",
    description:
      "Di chuyển thuận tiện giữa khu vực tâm linh và đỉnh Vân Sơn, hoạt động vào cuối tuần theo lịch vận hành.",
  },
];

const schedule = [
  { name: "Cáp Vân Sơn", weekday: "06:00 – 20:00", saturday: "05:30 – 21:00", sunday: "05:30 – 20:00" },
  { name: "Cáp Chùa Hang", weekday: "06:00 – 20:00", saturday: "05:30 – 21:00", sunday: "05:30 – 20:00" },
  { name: "Cáp Tâm An", weekday: "Tạm nghỉ", saturday: "06:30 – 19:00", sunday: "06:30 – 19:00" },
  { name: "Khu tâm linh", weekday: "06:30 – 19:30", saturday: "06:00 – 20:30", sunday: "06:00 – 19:30" },
  { name: "Buffet Vân Sơn", weekday: "10:00 – 15:00", saturday: "10:00 – 15:00", sunday: "10:00 – 15:00" },
];

const money = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);

function AppIcon({
  icon: Icon,
  title,
  tone,
  badge,
  onClick,
}: {
  icon: typeof Ticket;
  title: string;
  tone: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button className="app-icon" onClick={onClick}>
      <span className={`icon-tile ${tone}`}>
        <Icon size={27} strokeWidth={1.9} />
        {badge && <small>{badge}</small>}
      </span>
      <span>{title}</span>
    </button>
  );
}

function Header({
  title,
  back,
  onBack,
}: {
  title?: string;
  back?: boolean;
  onBack?: () => void;
}) {
  return (
    <header className="app-header">
      {back ? (
        <button className="round-button" aria-label="Quay lại" onClick={onBack}>
          <ArrowLeft size={21} />
        </button>
      ) : (
        <div className="brand-lockup">
          <img src="/images/logo.png" alt="" />
          <div>
            <strong>Núi Bà Đen</strong>
            <span>Vé cáp treo Tây Ninh</span>
          </div>
        </div>
      )}
      {title && <h1>{title}</h1>}
      <button className="round-button notification" aria-label="Thông báo">
        <Bell size={20} />
        <i />
      </button>
    </header>
  );
}

export default function MobileApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedTicket, setSelectedTicket] = useState(ticketTypes[0]);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [night, setNight] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [toast, setToast] = useState("");
  const [savedTrips, setSavedTrips] = useState<any[]>([]);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
    const saved = localStorage.getItem("nui-ba-den-trips");
    if (saved) {
      try {
        setSavedTrips(JSON.parse(saved));
      } catch {
        localStorage.removeItem("nui-ba-den-trips");
      }
    }
    const handler = (event: any) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const unitAdult = night && selectedTicket.nightAdult ? selectedTicket.nightAdult : selectedTicket.adult;
  const unitChild = night && selectedTicket.nightChild ? selectedTicket.nightChild : selectedTicket.child;
  const total = adult * unitAdult + child * unitChild;

  const todaySchedule = useMemo(() => {
    const day = new Date().getDay();
    if (day === 6) return { label: "Thứ Bảy", key: "saturday" as const };
    if (day === 0) return { label: "Chủ Nhật", key: "sunday" as const };
    return { label: "Hôm nay", key: "weekday" as const };
  }, []);

  const go = (next: Screen) => setScreen(next);

  const saveTrip = () => {
    const trip = {
      id: Date.now(),
      name: selectedTicket.name,
      date,
      adult,
      child,
      night,
      total,
      status: "Chờ xác nhận",
    };
    const next = [trip, ...savedTrips];
    setSavedTrips(next);
    localStorage.setItem("nui-ba-den-trips", JSON.stringify(next));
    setToast("Đã lưu yêu cầu vào Ví vé");
  };

  const contactZalo = async () => {
    const message = `ĐẶT VÉ NÚI BÀ ĐEN\n• ${selectedTicket.name}\n• Ngày đi: ${new Date(`${date}T00:00:00`).toLocaleDateString("vi-VN")}\n• Người lớn: ${adult} · Trẻ em: ${child}\n• Khung giờ: ${night ? "Sau 17h" : "Vé ngày"}\n• Tạm tính: ${money(total)}`;
    try {
      await navigator.clipboard.writeText(message);
      setToast("Đã sao chép yêu cầu đặt vé");
    } catch {
      setToast("Đang mở Zalo hỗ trợ");
    }
    saveTrip();
    window.open("https://zalo.me/0334109119", "_blank", "noopener,noreferrer");
  };

  const installApp = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
      setShowInstall(false);
    } else {
      setShowInstall(true);
    }
  };

  const HomeScreen = () => (
    <>
      <Header />
      <main className="screen home-screen">
        <section className="weather-row">
          <div>
            <MapPin size={15} />
            <span>Tây Ninh</span>
          </div>
          <div>
            <CloudSun size={17} />
            <strong>28°</strong>
            <span>Trời đẹp để lên đỉnh</span>
          </div>
        </section>

        <section className="hero-card">
          <div className="hero-overlay" />
          <div className="hero-copy">
            <span className="pill light"><Sparkles size={13} /> Đại lý phân phối</span>
            <h2>Chạm mây<br />trên đỉnh thiêng</h2>
            <p>Đặt vé QR nhanh chóng, chủ động hành trình Núi Bà Đen.</p>
            <button onClick={() => go("tickets")}>Đặt vé ngay <ChevronRight size={18} /></button>
          </div>
          <button
            className={`favorite ${favorite ? "active" : ""}`}
            aria-label="Yêu thích"
            onClick={() => setFavorite((value) => !value)}
          >
            <Heart size={19} fill={favorite ? "currentColor" : "none"} />
          </button>
        </section>

        <section className="quick-section">
          <div className="section-heading">
            <h2>Khám phá nhanh</h2>
            <span>Mọi tiện ích trong một chạm</span>
          </div>
          <div className="icon-grid">
            <AppIcon icon={Ticket} title="Đặt vé" tone="mint" onClick={() => go("tickets")} />
            <AppIcon icon={Clock3} title="Lịch cáp" tone="amber" onClick={() => go("schedule")} />
            <AppIcon icon={TrainFront} title="Tuyến cáp" tone="sky" onClick={() => go("routes")} />
            <AppIcon icon={WalletCards} title="Ví vé" tone="violet" badge={savedTrips.length ? String(savedTrips.length) : undefined} onClick={() => go("wallet")} />
            <AppIcon icon={Map} title="Bản đồ" tone="rose" onClick={() => go("routes")} />
            <AppIcon icon={UtensilsCrossed} title="Ẩm thực" tone="orange" onClick={() => go("offers")} />
            <AppIcon icon={QrCode} title="Cách dùng vé" tone="cyan" onClick={() => go("guide")} />
            <AppIcon icon={Headphones} title="Hỗ trợ" tone="indigo" onClick={() => go("support")} />
          </div>
        </section>

        <section className="today-card">
          <div className="today-top">
            <div>
              <span className="eyebrow"><span className="live-dot" /> Đang hoạt động</span>
              <h3>Lịch cáp hôm nay</h3>
            </div>
            <button onClick={() => go("schedule")}>Xem tất cả</button>
          </div>
          <div className="today-lines">
            <div><span className="mini-route green"><Mountain size={17} /></span><p><strong>Vân Sơn</strong><small>Lên đỉnh 986m</small></p><b>06:00 – 20:00</b></div>
            <div><span className="mini-route gold"><Sparkles size={17} /></span><p><strong>Chùa Hang</strong><small>Viếng Chùa Bà</small></p><b>06:00 – 20:00</b></div>
          </div>
        </section>

        <button className="install-banner" onClick={installApp}>
          <span><Smartphone size={22} /></span>
          <div><strong>Cài ứng dụng Núi Bà Đen</strong><small>Thêm vào màn hình chính để mở nhanh</small></div>
          <ChevronRight size={20} />
        </button>

        <section className="offer-card" onClick={() => go("offers")}>
          <div>
            <span>TRẢI NGHIỆM HOÀNG HÔN</span>
            <h3>Sau 17h, giá từ 150K</h3>
            <p>Ngắm tượng Phật Bà giữa không gian ánh sáng huyền ảo.</p>
          </div>
          <SunMedium size={42} />
        </section>
      </main>
    </>
  );

  const TicketScreen = () => (
    <>
      <Header title="Đặt vé cáp treo" back onBack={() => go("home")} />
      <main className="screen inner-screen">
        <div className="step-caption"><span>1</span> Chọn tuyến phù hợp</div>
        <div className="ticket-options">
          {ticketTypes.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`ticket-option ${selectedTicket.id === item.id ? "selected" : ""}`}
                onClick={() => setSelectedTicket(item)}
              >
                <span className={`route-symbol ${item.accent}`}><Icon size={22} /></span>
                <div><strong>{item.name}</strong><small>{item.subtitle}</small></div>
                <b>{money(night && item.nightAdult ? item.nightAdult : item.adult).replace("₫", "đ")}</b>
                <i>{selectedTicket.id === item.id && <Check size={15} />}</i>
              </button>
            );
          })}
        </div>

        <div className="booking-card">
          <label>
            <span><CalendarDays size={17} /> Ngày đi dự kiến</span>
            <input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setDate(event.target.value)} />
          </label>
          <div className="time-choice">
            <button className={!night ? "active" : ""} onClick={() => setNight(false)}><SunMedium size={16} /> Vé ngày</button>
            <button className={night ? "active" : ""} onClick={() => setNight(true)}><Sparkles size={16} /> Sau 17h</button>
          </div>
          <div className="quantity-row">
            <div><strong>Người lớn</strong><small>Từ 1,4m</small></div>
            <span>{money(unitAdult).replace("₫", "đ")}</span>
            <div className="stepper">
              <button disabled={adult === 0} onClick={() => setAdult(Math.max(0, adult - 1))}><Minus size={15} /></button>
              <b>{adult}</b>
              <button onClick={() => setAdult(adult + 1)}><Plus size={15} /></button>
            </div>
          </div>
          <div className="quantity-row">
            <div><strong>Trẻ em</strong><small>1m – dưới 1,4m</small></div>
            <span>{money(unitChild).replace("₫", "đ")}</span>
            <div className="stepper">
              <button disabled={child === 0} onClick={() => setChild(Math.max(0, child - 1))}><Minus size={15} /></button>
              <b>{child}</b>
              <button onClick={() => setChild(child + 1)}><Plus size={15} /></button>
            </div>
          </div>
          <p className="free-note"><Info size={15} /> Trẻ em dưới 1m được miễn phí vé.</p>
        </div>

        <div className="secure-strip">
          <ShieldCheck size={22} />
          <div><strong>Vé điện tử QR</strong><span>Không cần đổi vé giấy · Quét mã tại cổng</span></div>
        </div>

        <div className="checkout-bar">
          <div><span>Tạm tính</span><strong>{money(total)}</strong></div>
          <button disabled={total === 0} onClick={contactZalo}>Tiếp tục qua Zalo <ChevronRight size={18} /></button>
        </div>
      </main>
    </>
  );

  const ScheduleScreen = () => (
    <>
      <Header title="Lịch vận hành" back onBack={() => go("home")} />
      <main className="screen inner-screen">
        <section className="schedule-hero">
          <div><span className="pill light"><Clock3 size={13} /> Cập nhật mới nhất</span><h2>Lên kế hoạch<br />cho chuyến đi</h2></div>
          <CalendarDays size={62} strokeWidth={1.2} />
        </section>
        <div className="day-tabs">
          <button className={todaySchedule.key === "weekday" ? "active" : ""}>Thứ 2 – Thứ 6</button>
          <button className={todaySchedule.key === "saturday" ? "active" : ""}>Thứ 7</button>
          <button className={todaySchedule.key === "sunday" ? "active" : ""}>Chủ nhật</button>
        </div>
        <div className="schedule-list">
          {schedule.map((item, index) => (
            <div key={item.name} className="schedule-item">
              <span className={`schedule-icon s${index}`}><Clock3 size={18} /></span>
              <div><strong>{item.name}</strong><small>{todaySchedule.label}</small></div>
              <b>{item[todaySchedule.key]}</b>
            </div>
          ))}
        </div>
        <div className="notice-card"><Info size={20} /><p><strong>Lưu ý thời tiết</strong><span>Lịch vận hành có thể thay đổi tùy tình hình thực tế. Cổng khu du lịch mở trước và đóng sau giờ cáp 1 tiếng.</span></p></div>
      </main>
    </>
  );

  const RoutesScreen = () => (
    <>
      <Header title="Khám phá tuyến cáp" back onBack={() => go("home")} />
      <main className="screen inner-screen">
        <p className="intro-text">Ba hành trình, ba góc nhìn độc đáo về đỉnh thiêng Núi Bà Đen.</p>
        <div className="route-cards">
          {routes.map((route) => (
            <article className="route-card" key={route.id}>
              <div className="route-image" style={{ backgroundImage: `url(${route.image})` }}>
                <span>{route.kicker}</span>
                <button aria-label="Chỉ đường"><Navigation size={17} /></button>
              </div>
              <div className="route-body">
                <h2>{route.name}</h2>
                <p>{route.description}</p>
                <div className="route-stats">
                  <span><Clock3 size={15} /><small>Thời gian</small><b>{route.time}</b></span>
                  <span><Navigation size={15} /><small>Chiều dài</small><b>{route.distance}</b></span>
                </div>
                <div className="station"><TrainFront size={17} /> {route.station}</div>
                <button onClick={() => { setSelectedTicket(route.id === "chua-hang" ? ticketTypes[1] : ticketTypes[0]); go("tickets"); }}>Đặt tuyến này <ChevronRight size={17} /></button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );

  const WalletScreen = () => (
    <>
      <Header title="Ví vé của tôi" back onBack={() => go("home")} />
      <main className="screen inner-screen">
        {savedTrips.length === 0 ? (
          <div className="empty-state">
            <span><WalletCards size={42} /></span>
            <h2>Chưa có yêu cầu đặt vé</h2>
            <p>Vé và các yêu cầu đã lưu sẽ xuất hiện tại đây để bạn tiện theo dõi.</p>
            <button onClick={() => go("tickets")}>Đặt vé đầu tiên</button>
          </div>
        ) : (
          <div className="wallet-list">
            <div className="wallet-summary"><span><Ticket size={24} /></span><div><small>Tổng yêu cầu</small><strong>{savedTrips.length} chuyến đi</strong></div></div>
            {savedTrips.map((trip) => (
              <article className="saved-ticket" key={trip.id}>
                <div className="ticket-rip" />
                <div className="saved-top"><span className="pill pending">{trip.status}</span><QrCode size={29} /></div>
                <h3>{trip.name}</h3>
                <div className="saved-details">
                  <span><CalendarDays size={15} /> {new Date(`${trip.date}T00:00:00`).toLocaleDateString("vi-VN")}</span>
                  <span><UserRound size={15} /> {trip.adult + trip.child} khách</span>
                  <span><Clock3 size={15} /> {trip.night ? "Sau 17h" : "Vé ngày"}</span>
                </div>
                <div className="saved-total"><span>Tạm tính</span><strong>{money(trip.total)}</strong></div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );

  const GuideScreen = () => (
    <>
      <Header title="Hướng dẫn dùng vé" back onBack={() => go("home")} />
      <main className="screen inner-screen">
        <section className="qr-hero"><QrCode size={70} /><h2>Đi thẳng tới cổng quét</h2><p>Mã QR nhận được là vé điện tử chính thức. Bạn không cần đổi sang vé giấy.</p></section>
        <div className="guide-steps">
          {[
            ["01", "Chọn vé và ngày đi", "Kiểm tra đúng tuyến cáp, số lượng và khung giờ."],
            ["02", "Hoàn tất qua Zalo", "Gửi yêu cầu đã soạn sẵn và xác nhận thanh toán."],
            ["03", "Nhận mã QR", "Lưu vé QR vào điện thoại, tăng độ sáng màn hình."],
            ["04", "Quét vé tại cổng", "Đưa mã QR vào đầu đọc để vào ga và lên cabin."],
          ].map(([number, title, text]) => <div key={number}><span>{number}</span><p><strong>{title}</strong><small>{text}</small></p></div>)}
        </div>
        <div className="notice-card green"><ShieldCheck size={20} /><p><strong>Mẹo nhỏ</strong><span>Chụp màn hình mã QR để vẫn mở được vé khi khu vực đông khách hoặc mạng yếu.</span></p></div>
      </main>
    </>
  );

  const SupportScreen = () => (
    <>
      <Header title="Hỗ trợ du khách" back onBack={() => go("home")} />
      <main className="screen inner-screen">
        <section className="support-hero"><span><Headphones size={40} /></span><h2>Chúng tôi luôn sẵn sàng</h2><p>Hỗ trợ đặt vé, đổi ngày và giải đáp hành trình mỗi ngày.</p></section>
        <div className="contact-actions">
          <a href="tel:0334109119"><span className="contact-icon green"><Phone size={21} /></span><div><strong>Gọi hotline</strong><small>0334 109 119</small></div><ChevronRight size={19} /></a>
          <a href="https://zalo.me/0334109119" target="_blank" rel="noreferrer"><span className="contact-icon blue"><MessageIcon /></span><div><strong>Chat qua Zalo</strong><small>Phản hồi nhanh chóng</small></div><ChevronRight size={19} /></a>
        </div>
        <h3 className="subheading">Câu hỏi thường gặp</h3>
        <div className="faq-list">
          {[
            ["Trẻ em bao nhiêu tuổi được miễn phí?", "Vé tính theo chiều cao: dưới 1m được miễn phí; từ 1m đến dưới 1,4m áp dụng vé trẻ em."],
            ["Vé đã mua có hoàn, hủy được không?", "Vé đã xuất không hoàn/hủy. Có thể liên hệ hỗ trợ đổi ngày trước ít nhất 24 giờ, tùy điều kiện vé."],
            ["Vé sau 17h có gì khác?", "Mức giá ưu đãi áp dụng khi xuất phát sau 17h, phù hợp ngắm hoàng hôn và cảnh đêm trên đỉnh."],
          ].map(([question, answer]) => <details key={question}><summary>{question}<Plus size={17} /></summary><p>{answer}</p></details>)}
        </div>
      </main>
    </>
  );

  const OfferScreen = () => (
    <>
      <Header title="Ưu đãi & trải nghiệm" back onBack={() => go("home")} />
      <main className="screen inner-screen">
        <section className="night-hero">
          <span className="pill light"><Star size={13} /> Gợi ý nổi bật</span>
          <h2>Hoàng hôn<br />trên đỉnh 986m</h2>
          <p>Khởi hành sau 17h để tận hưởng không khí mát lạnh và cảnh đêm rực sáng.</p>
          <button onClick={() => { setNight(true); go("tickets"); }}>Xem vé sau 17h</button>
        </section>
        <h3 className="subheading">Tiện ích cho hành trình</h3>
        <div className="experience-grid">
          <button onClick={() => go("tickets")}><span><UtensilsCrossed size={22} /></span><strong>Buffet Vân Sơn</strong><small>10:00 – 15:00</small></button>
          <button onClick={() => go("routes")}><span><Compass size={22} /></span><strong>Điểm check-in</strong><small>Săn mây & ngắm cảnh</small></button>
          <button onClick={() => go("schedule")}><span><Zap size={22} /></span><strong>WOW PASS</strong><small>Ưu tiên lối vào</small></button>
          <button onClick={() => go("support")}><span><UsersIcon /></span><strong>Vé đoàn</strong><small>Từ 15 khách</small></button>
        </div>
      </main>
    </>
  );

  return (
    <div className="app-shell">
      {screen === "home" && <HomeScreen />}
      {screen === "tickets" && <TicketScreen />}
      {screen === "schedule" && <ScheduleScreen />}
      {screen === "routes" && <RoutesScreen />}
      {screen === "wallet" && <WalletScreen />}
      {screen === "guide" && <GuideScreen />}
      {screen === "support" && <SupportScreen />}
      {screen === "offers" && <OfferScreen />}

      <nav className="bottom-nav" aria-label="Điều hướng chính">
        <button className={screen === "home" ? "active" : ""} onClick={() => go("home")}><Home size={21} /><span>Trang chủ</span></button>
        <button className={screen === "tickets" ? "active" : ""} onClick={() => go("tickets")}><Ticket size={21} /><span>Đặt vé</span></button>
        <button className="nav-main" onClick={() => go("tickets")} aria-label="Đặt vé nhanh"><ShoppingBag size={23} /></button>
        <button className={screen === "wallet" ? "active" : ""} onClick={() => go("wallet")}><WalletCards size={21} /><span>Ví vé</span></button>
        <button className={screen === "support" ? "active" : ""} onClick={() => go("support")}><CircleHelp size={21} /><span>Hỗ trợ</span></button>
      </nav>

      {showInstall && (
        <div className="modal-backdrop" onClick={() => setShowInstall(false)}>
          <section className="install-sheet" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowInstall(false)}><X size={20} /></button>
            <span className="install-logo"><img src="/icon-192.png" alt="" /></span>
            <h2>Thêm Núi Bà Đen vào màn hình chính</h2>
            <div className="install-step"><b>1</b><p>Chạm nút <strong>Chia sẻ</strong> <Share size={17} /> trong trình duyệt.</p></div>
            <div className="install-step"><b>2</b><p>Chọn <strong>Thêm vào màn hình chính</strong>.</p></div>
            <div className="install-step"><b>3</b><p>Chạm <strong>Thêm</strong> để mở ứng dụng như app mobile.</p></div>
            <button className="sheet-done" onClick={() => setShowInstall(false)}>Tôi đã hiểu</button>
          </section>
        </div>
      )}

      {toast && <div className="toast"><Check size={17} /> {toast}</div>}
    </div>
  );
}

function MessageIcon() {
  return <span className="text-icon">Z</span>;
}

function UsersIcon() {
  return <UserRound size={22} />;
}
