"use client";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
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
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Star,
  SunMedium,
  Ticket,
  TrainFront,
  Trash2,
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
  | "offers"
  | "events";

type TicketType = {
  id: string;
  name: string;
  subtitle: string;
  adult: number;
  child: number;
  weekendAdult?: number;
  weekendChild?: number;
  nightAdult?: number;
  nightChild?: number;
  icon: typeof Mountain;
  accent: string;
  category: "combo" | "cable" | "sunset" | "service";
  image: string;
  sold: string;
  badge?: string;
  period: "day" | "sunset" | "flexible";
  includes: string[];
  available?: boolean;
};

const ticketTypes: TicketType[] = [
  {
    id: "spiritual-combo",
    name: "Combo Hành Trình Tâm Linh",
    subtitle: "Đỉnh Vân Sơn khứ hồi & Chùa Hang",
    adult: 650000,
    child: 500000,
    nightAdult: 400000,
    nightChild: 300000,
    icon: Sparkles,
    accent: "green",
    category: "combo",
    image: "/images/phat-ba-dem.jpg",
    sold: "63.037",
    badge: "Bán chạy",
    period: "flexible",
    includes: ["Cáp Vân Sơn khứ hồi", "Cáp Chùa Hang khứ hồi", "Vé vào cổng khu du lịch"],
  },
  {
    id: "pagoda",
    name: "Cáp Treo Chùa Hang Khứ Hồi",
    subtitle: "Viếng Chùa Bà · Khứ hồi trong ngày",
    adult: 250000,
    child: 150000,
    nightAdult: 150000,
    nightChild: 100000,
    icon: Sparkles,
    accent: "gold",
    category: "cable",
    image: "/images/tam-an.jpg",
    sold: "6.058",
    period: "flexible",
    includes: ["Cáp treo Chùa Hang khứ hồi", "Tham quan Chùa Bà và Điện Bà"],
  },
  {
    id: "pagoda-one-way",
    name: "Cáp Treo Chùa Hang Một Chiều",
    subtitle: "Một lượt lên hoặc xuống tuyến Chùa Hang",
    adult: 150000,
    child: 100000,
    icon: Sparkles,
    accent: "gold",
    category: "cable",
    image: "/images/tam-an.jpg",
    sold: "1.417",
    period: "day",
    includes: ["Một lượt cáp treo tuyến Chùa Hang", "Không bao gồm lượt quay về"],
  },
  {
    id: "all-in-one",
    name: "Combo All In One Núi Bà Đen",
    subtitle: "Cáp treo khứ hồi & Buffet trưa",
    adult: 800000,
    child: 600000,
    weekendAdult: 850000,
    weekendChild: 650000,
    icon: Ticket,
    accent: "blue",
    category: "combo",
    image: "/images/hoang-hon.jpg",
    sold: "50.668",
    badge: "Trọn gói",
    period: "day",
    includes: ["Cáp Vân Sơn và Chùa Hang khứ hồi", "Buffet trưa tại nhà hàng Vân Sơn", "Vé vào cổng khu du lịch"],
  },
  {
    id: "summit",
    name: "Cáp Treo Đỉnh Vân Sơn Khứ Hồi",
    subtitle: "Chinh phục nóc nhà Nam Bộ 986m",
    adult: 450000,
    child: 350000,
    nightAdult: 300000,
    nightChild: 200000,
    icon: Mountain,
    accent: "green",
    category: "cable",
    image: "/images/van-son.jpg",
    sold: "25.354",
    period: "flexible",
    includes: ["Cáp Vân Sơn khứ hồi", "Tham quan đỉnh núi 986m", "Chiêm bái Tượng Phật Bà"],
  },
  {
    id: "tam-an",
    name: "Cáp Treo Tuyến Tâm An",
    subtitle: "Kết nối khu tâm linh và đỉnh Vân Sơn",
    adult: 450000,
    child: 350000,
    nightAdult: 300000,
    nightChild: 200000,
    icon: TrainFront,
    accent: "green",
    category: "cable",
    image: "/images/tam-an.jpg",
    sold: "728",
    period: "flexible",
    includes: ["Cáp treo tuyến Tâm An khứ hồi", "Áp dụng theo lịch vận hành thực tế"],
  },
  {
    id: "summit-buffet",
    name: "Combo Đỉnh Vân Sơn & Buffet Trưa",
    subtitle: "Cáp treo khứ hồi kèm buffet",
    adult: 650000,
    child: 450000,
    weekendAdult: 700000,
    weekendChild: 500000,
    icon: UtensilsCrossed,
    accent: "blue",
    category: "combo",
    image: "/images/hoang-hon.jpg",
    sold: "24.837",
    period: "day",
    includes: ["Cáp Vân Sơn khứ hồi", "Buffet trưa tại nhà hàng Vân Sơn", "Vé vào cổng khu du lịch"],
  },
  {
    id: "sunset-summit",
    name: "Combo Hoàng Hôn Đỉnh Vân Sơn",
    subtitle: "Khởi hành sau 17h · Kèm ẩm thực",
    adult: 400000,
    child: 300000,
    icon: SunMedium,
    accent: "gold",
    category: "sunset",
    image: "/images/phat-ba-dem.jpg",
    sold: "26",
    badge: "Sau 17h",
    period: "sunset",
    includes: ["Cáp Vân Sơn khứ hồi sau 17h", "Vé ẩm thực tối", "Ngắm cảnh đêm trên đỉnh"],
  },
  {
    id: "sunset-combo",
    name: "Hoàng Hôn Đỉnh & Chùa Hang",
    subtitle: "Hai tuyến cáp · Khởi hành sau 17h",
    adult: 500000,
    child: 400000,
    icon: Sparkles,
    accent: "gold",
    category: "sunset",
    image: "/images/phat-ba-dem.jpg",
    sold: "16",
    badge: "Sau 17h",
    period: "sunset",
    includes: ["Cáp Vân Sơn khứ hồi", "Cáp Chùa Hang khứ hồi", "Vé ẩm thực tối"],
  },
  {
    id: "entrance",
    name: "Vé Vào Cổng Khu Du Lịch",
    subtitle: "Không bao gồm vé cáp treo",
    adult: 10000,
    child: 5000,
    icon: Ticket,
    accent: "blue",
    category: "service",
    image: "/images/tam-an.jpg",
    sold: "1.207.655",
    period: "day",
    includes: ["Vé vào cổng Khu du lịch Núi Bà Đen"],
  },
  {
    id: "buffet",
    name: "Vé Buffet Vân Sơn",
    subtitle: "Buffet trưa · 10:00 – 15:00",
    adult: 300000,
    child: 200000,
    icon: UtensilsCrossed,
    accent: "blue",
    category: "service",
    image: "/images/hoang-hon.jpg",
    sold: "Mới",
    period: "day",
    includes: ["Buffet trưa tại nhà hàng Vân Sơn", "Không bao gồm vé cáp treo"],
  },
  {
    id: "food",
    name: "Vé Ẩm Thực",
    subtitle: "Áp dụng theo danh mục ẩm thực",
    adult: 150000,
    child: 150000,
    icon: UtensilsCrossed,
    accent: "gold",
    category: "service",
    image: "/images/hoang-hon.jpg",
    sold: "Mới",
    period: "day",
    includes: ["Giá trị ẩm thực 150.000đ", "Không bao gồm vé cáp treo"],
  },
  {
    id: "wow-pass",
    name: "WOW PASS Núi Bà Đen",
    subtitle: "Lối đi ưu tiên · Không phải vé cáp treo",
    adult: 300000,
    child: 300000,
    icon: Zap,
    accent: "blue",
    category: "service",
    image: "/images/van-son.jpg",
    sold: "226",
    badge: "Tiện ích",
    period: "day",
    includes: ["Lối đi ưu tiên tại các điểm áp dụng", "Cần mua kèm vé cáp treo hợp lệ"],
  },
];

type CartItem = {
  product: TicketType;
  adult: number;
  child: number;
  night: boolean;
};

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

const festivals = [
  {
    name: "Lễ vía Đức Phật Di Lặc",
    date: "Mùng 1 tháng Giêng âm lịch",
    description: "Ngày lễ mở đầu năm mới, du khách đến lễ Phật và cầu mong bình an, hòa thuận, sung túc.",
  },
  {
    name: "Hội xuân Núi Bà Đen",
    date: "Mùng 4 – 16 tháng Giêng âm lịch",
    description: "Lễ hội lớn nhất trong năm với nghi lễ dâng hương, trình thập cúng và nhiều chương trình biểu diễn.",
  },
  {
    name: "Lễ hội truyền thống động Kim Quang",
    date: "14 tháng Giêng âm lịch",
    description: "Dịp tưởng niệm các anh hùng liệt sĩ và tìm hiểu dấu ấn lịch sử của căn cứ cách mạng động Kim Quang.",
  },
  {
    name: "Lễ vía Quán Thế Âm Bồ Tát đản sinh",
    date: "19 tháng 2 âm lịch",
    description: "Không gian trang nghiêm với lễ dâng hương, tụng kinh, thả hoa đăng và cầu nguyện bình an.",
  },
  {
    name: "Đại lễ Phật Đản",
    date: "Tháng 4 âm lịch",
    description: "Đại lễ kỷ niệm ngày Đức Phật ra đời, nổi bật với nghi thức tắm Phật, diễu hành và cầu nguyện.",
  },
  {
    name: "Lễ vía Bà Linh Sơn Thánh Mẫu",
    date: "Tháng 5 âm lịch",
    description: "Lễ hội tâm linh tiêu biểu với lễ tắm Bà, lễ cúng ngọ và nghi thức cầu tài lộc, bình an.",
  },
  {
    name: "Lễ vía Quán Thế Âm Bồ Tát thành đạo",
    date: "Tháng 6 âm lịch",
    description: "Ngày lễ đánh dấu Bồ Tát chứng đắc đạo quả, gồm các nghi thức tụng kinh, dâng hương và hoa đăng.",
  },
  {
    name: "Lễ Vu Lan báo hiếu",
    date: "Tháng 7 âm lịch",
    description: "Dịp tri ân cha mẹ, tổ tiên qua nghi lễ cầu siêu, cài hoa hồng và thắp nến tưởng niệm.",
  },
  {
    name: "Lễ hội rằm Trung thu",
    date: "Tháng 8 âm lịch",
    description: "Ngày hội đoàn viên với hoạt động rước đèn, thưởng trăng, biểu diễn nghệ thuật và trò chơi dân gian.",
  },
  {
    name: "Lễ vía Quán Thế Âm Bồ Tát xuất gia",
    date: "Tháng 9 âm lịch",
    description: "Sự kiện khép lại chuỗi lễ hội lớn trong năm, hướng mỗi người đến sự buông bỏ và tu dưỡng tâm hồn.",
  },
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
      <span className="header-spacer" aria-hidden="true" />
    </header>
  );
}

export default function MobileApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedTicket, setSelectedTicket] = useState(ticketTypes[0]);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [night, setNight] = useState(false);
  const [ticketCategory, setTicketCategory] = useState<"all" | TicketType["category"]>("all");
  const [ticketSearch, setTicketSearch] = useState("");
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
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

  const isWeekendPricing = [0, 6].includes(new Date(`${date}T00:00:00`).getDay());
  const adultPriceFor = (product: TicketType, nightMode: boolean) =>
    nightMode && product.nightAdult
      ? product.nightAdult
      : isWeekendPricing && product.weekendAdult
        ? product.weekendAdult
        : product.adult;
  const childPriceFor = (product: TicketType, nightMode: boolean) =>
    nightMode && product.nightChild
      ? product.nightChild
      : isWeekendPricing && product.weekendChild
        ? product.weekendChild
        : product.child;
  const unitAdult = adultPriceFor(selectedTicket, night);
  const unitChild = childPriceFor(selectedTicket, night);
  const total = adult * unitAdult + child * unitChild;
  const cartTotal = cart.reduce((sum, item) => {
    const adultPrice = adultPriceFor(item.product, item.night);
    const childPrice = childPriceFor(item.product, item.night);
    return sum + item.adult * adultPrice + item.child * childPrice;
  }, 0);
  const cartQuantity = cart.reduce((sum, item) => sum + item.adult + item.child, 0);
  const filteredTickets = ticketTypes.filter((item) => {
    const matchesCategory =
      ticketCategory === "all" ||
      item.category === ticketCategory ||
      (ticketCategory === "sunset" && Boolean(item.nightAdult));
    const matchesSearch = `${item.name} ${item.subtitle}`.toLowerCase().includes(ticketSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const todaySchedule = useMemo(() => {
    const day = new Date().getDay();
    if (day === 6) return { label: "Thứ Bảy", key: "saturday" as const };
    if (day === 0) return { label: "Chủ Nhật", key: "sunday" as const };
    return { label: "Hôm nay", key: "weekday" as const };
  }, []);

  const go = (next: Screen) => setScreen(next);

  const saveTrip = () => {
    const items = cart.length ? cart : [{ product: selectedTicket, adult, child, night }];
    const trip = {
      id: Date.now(),
      name: items.length === 1 ? items[0].product.name : `${items.length} hạng mục vé`,
      date,
      adult: items.reduce((sum, item) => sum + item.adult, 0),
      child: items.reduce((sum, item) => sum + item.child, 0),
      night: items.every((item) => item.night),
      total: cart.length ? cartTotal : total,
      status: "Chờ xác nhận",
    };
    const next = [trip, ...savedTrips];
    setSavedTrips(next);
    localStorage.setItem("nui-ba-den-trips", JSON.stringify(next));
    setToast("Đã lưu yêu cầu vào Ví vé");
  };

  const cancelTrip = (tripId: number) => {
    if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;
    const next = savedTrips.map((trip) =>
      trip.id === tripId ? { ...trip, status: "Đã hủy" } : trip,
    );
    setSavedTrips(next);
    localStorage.setItem("nui-ba-den-trips", JSON.stringify(next));
    setCart([]);
    setShowCart(false);
    setToast("Đã hủy đơn và làm trống giỏ hàng");
  };

  const startNewOrder = () => {
    setCart([]);
    setAdult(1);
    setChild(0);
    setNight(false);
    setTicketCategory("all");
    setTicketSearch("");
    go("tickets");
  };

  const contactZalo = async () => {
    const items = cart.length ? cart : [{ product: selectedTicket, adult, child, night }];
    const lines = items.map((item, index) =>
      `${index + 1}. ${item.product.name}\n   Người lớn: ${item.adult} · Trẻ em: ${item.child} · ${item.night ? "Sau 17h" : "Vé ngày"}`,
    ).join("\n");
    const message = `ĐẶT VÉ NÚI BÀ ĐEN\nNgày đi: ${new Date(`${date}T00:00:00`).toLocaleDateString("vi-VN")}\n${lines}\nTẠM TÍNH: ${money(cart.length ? cartTotal : total)}`;
    try {
      await navigator.clipboard.writeText(message);
      setToast("Đã sao chép yêu cầu đặt vé");
    } catch {
      setToast("Đang mở Zalo hỗ trợ");
    }
    saveTrip();
    window.open("https://zalo.me/0334109119", "_blank", "noopener,noreferrer");
  };

  const openTicket = (item: TicketType) => {
    setSelectedTicket(item);
    setNight(item.period === "sunset" || (ticketCategory === "sunset" && Boolean(item.nightAdult)));
    setShowTicketDetail(true);
  };

  const addToCart = (openCartAfter = false) => {
    if (adult + child === 0) {
      setToast("Vui lòng chọn ít nhất 1 vé");
      return;
    }
    setCart((current) => [
      ...current.filter((item) => !(item.product.id === selectedTicket.id && item.night === night)),
      { product: selectedTicket, adult, child, night },
    ]);
    setShowTicketDetail(false);
    setToast("Đã thêm vé vào giỏ");
    if (openCartAfter) setShowCart(true);
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

        <section className="event-preview">
          <div className="section-heading">
            <div>
              <span className="eyebrow">VĂN HÓA · TÂM LINH</span>
              <h2>Sự kiện quanh năm</h2>
            </div>
            <button onClick={() => go("events")}>Xem tất cả <ChevronRight size={14} /></button>
          </div>
          <button className="event-featured" onClick={() => go("events")}>
            <span className="event-date"><CalendarDays size={17} /> Mùng 4 – 16 tháng Giêng</span>
            <strong>Hội xuân Núi Bà Đen</strong>
            <small>Lễ hội lớn nhất trong năm với nghi lễ truyền thống và nhiều chương trình biểu diễn đặc sắc.</small>
            <i>Khám phá 10 lễ hội <ChevronRight size={14} /></i>
          </button>
          <div className="event-mini-list">
            {festivals.slice(0, 3).map((festival, index) => (
              <button key={festival.name} onClick={() => go("events")}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span><strong>{festival.name}</strong><small>{festival.date}</small></span>
                <ChevronRight size={15} />
              </button>
            ))}
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

  const EventsScreen = () => (
    <>
      <Header title="Sự kiện Núi Bà Đen" back onBack={() => go("home")} />
      <main className="screen inner-screen events-screen">
        <section className="events-hero">
          <div>
            <span className="pill light"><CalendarDays size={13} /> Lịch lễ hội</span>
            <h2>Hành trình lễ hội<br />suốt bốn mùa</h2>
            <p>10 dịp lễ văn hóa và tâm linh tiêu biểu để bạn chủ động lên kế hoạch hành hương.</p>
          </div>
          <Sparkles size={58} strokeWidth={1.25} />
        </section>

        <div className="festival-list">
          {festivals.map((festival, index) => (
            <article className="festival-card" key={festival.name}>
              <div className="festival-number">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <span><CalendarDays size={13} /> {festival.date}</span>
                <h3>{festival.name}</h3>
                <p>{festival.description}</p>
              </div>
            </article>
          ))}
        </div>

      </main>
    </>
  );

  const TicketScreen = () => (
    <>
      <Header title="Đặt vé cáp treo" back onBack={() => go("home")} />
      <main className="screen ticket-catalog">
        <section className="booking-context">
          <div className="context-grid">
            <div><span><MapPin size={14} /> Địa điểm</span><strong>Tây Ninh</strong></div>
            <label><span><CalendarDays size={14} /> Ngày đi</span><input aria-label="Ngày đi" type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setDate(event.target.value)} /></label>
            <button onClick={() => setShowGuestPicker((value) => !value)}>
              <span><UserRound size={14} /> Số lượng</span>
              <strong>{adult} người lớn, {child} trẻ em</strong>
              <ChevronDown size={15} />
            </button>
          </div>
          {showGuestPicker && (
            <div className="guest-picker">
              <div>
                <p><strong>Người lớn</strong><small>Từ 140cm trở lên</small></p>
                <div className="stepper"><button disabled={adult === 0} onClick={() => setAdult(Math.max(0, adult - 1))}><Minus size={15} /></button><b>{adult}</b><button onClick={() => setAdult(adult + 1)}><Plus size={15} /></button></div>
              </div>
              <div>
                <p><strong>Trẻ em</strong><small>Từ 100cm đến dưới 140cm</small></p>
                <div className="stepper"><button disabled={child === 0} onClick={() => setChild(Math.max(0, child - 1))}><Minus size={15} /></button><b>{child}</b><button onClick={() => setChild(child + 1)}><Plus size={15} /></button></div>
              </div>
              <p className="free-note"><Info size={14} /> Trẻ em dưới 100cm được miễn phí vé.</p>
            </div>
          )}
        </section>

        <section className="catalog-head">
          <div><span className="eyebrow">VÉ NÚI BÀ ĐEN</span><h2>Chọn trải nghiệm</h2><p>Giá tốt cho ngày bạn đã chọn</p></div>
          <button aria-label="Mở giỏ hàng" onClick={() => setShowCart(true)}><ShoppingCart size={20} />{cartQuantity > 0 && <b>{cartQuantity}</b>}</button>
        </section>

        <div className="ticket-search">
          <Search size={17} />
          <input value={ticketSearch} onChange={(event) => setTicketSearch(event.target.value)} placeholder="Tìm vé, combo, buffet..." />
          <SlidersHorizontal size={17} />
        </div>

        <div className="catalog-tabs" role="tablist" aria-label="Nhóm vé">
          {[
            ["all", "Tất cả"],
            ["combo", "Combo"],
            ["cable", "Cáp treo"],
            ["sunset", "Sau 17h"],
            ["service", "Tiện ích"],
          ].map(([value, label]) => <button role="tab" aria-selected={ticketCategory === value} className={ticketCategory === value ? "active" : ""} key={value} onClick={() => setTicketCategory(value as typeof ticketCategory)}>{label}</button>)}
        </div>

        <div className="result-count"><span>{filteredTickets.length} lựa chọn phù hợp</span><small>Áp dụng 21/07 – 31/12/2026</small></div>

        <div className="product-list">
          {filteredTickets.map((item) => (
            <article className="product-card" key={item.id}>
              <button className="product-image" onClick={() => openTicket(item)} style={{ backgroundImage: `url(${item.image})` }} aria-label={`Xem ${item.name}`}>
                {item.badge && <span>{item.badge}</span>}
              </button>
              <div className="product-info">
                <button className="product-title" onClick={() => openTicket(item)}><strong>{item.name}</strong><small>{item.subtitle}</small></button>
                <p className="sold-line"><ShoppingBag size={12} /> {item.sold === "Mới" ? "Đang mở bán" : `${item.sold} đã bán`}</p>
                <div className="product-price">
                  <span>{ticketCategory === "sunset" && item.nightAdult ? "Giá người lớn sau 17h" : isWeekendPricing && item.weekendAdult ? "Giá cuối tuần/lễ" : "Giá vé người lớn"}</span>
                  <strong>{money(adultPriceFor(item, item.period === "sunset" || (ticketCategory === "sunset" && Boolean(item.nightAdult))))}</strong>
                </div>
                <button className="book-product" onClick={() => openTicket(item)}>Chọn vé</button>
              </div>
            </article>
          ))}
        </div>

        {filteredTickets.length === 0 && <div className="no-results"><Search size={32} /><strong>Không tìm thấy vé phù hợp</strong><span>Thử từ khóa hoặc nhóm vé khác.</span></div>}

        <div className="catalog-trust"><ShieldCheck size={20} /><div><strong>Vé điện tử QR chính thức</strong><span>Nhận vé nhanh · Không cần đổi vé giấy</span></div></div>
      </main>

      {cartQuantity > 0 && (
        <button className="floating-cart" onClick={() => setShowCart(true)}>
          <span><ShoppingCart size={20} /><b>{cartQuantity}</b></span>
          <div><small>Tạm tính</small><strong>{money(cartTotal)}</strong></div>
          <em>Xem giỏ <ChevronRight size={16} /></em>
        </button>
      )}
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
                <button onClick={() => {
                  const product = ticketTypes.find((item) => item.id === (route.id === "chua-hang" ? "pagoda" : "summit"));
                  if (product) setSelectedTicket(product);
                  setTicketCategory("cable");
                  go("tickets");
                }}>Đặt tuyến này <ChevronRight size={17} /></button>
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
              <article className={`saved-ticket ${trip.status === "Đã hủy" ? "cancelled" : ""}`} key={trip.id}>
                <div className="ticket-rip" />
                <div className="saved-top"><span className={`pill ${trip.status === "Đã hủy" ? "cancelled" : "pending"}`}>{trip.status}</span><QrCode size={29} /></div>
                <h3>{trip.name}</h3>
                <div className="saved-details">
                  <span><CalendarDays size={15} /> {new Date(`${trip.date}T00:00:00`).toLocaleDateString("vi-VN")}</span>
                  <span><UserRound size={15} /> {trip.adult + trip.child} khách</span>
                  <span><Clock3 size={15} /> {trip.night ? "Sau 17h" : "Vé ngày"}</span>
                </div>
                <div className="saved-total"><span>Tạm tính</span><strong>{money(trip.total)}</strong></div>
                {trip.status === "Đã hủy" ? (
                  <button className="rebook-order" onClick={startNewOrder}>
                    <ShoppingBag size={15} /> Đặt lại
                  </button>
                ) : (
                  <button className="cancel-order" onClick={() => cancelTrip(trip.id)}>
                    <Trash2 size={14} /> Hủy đơn hàng
                  </button>
                )}
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
          <button onClick={() => { setNight(true); setTicketCategory("sunset"); go("tickets"); }}>Xem vé sau 17h</button>
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
      {screen === "events" && <EventsScreen />}

      {showTicketDetail && (
        <div className="modal-backdrop ticket-modal" onClick={() => setShowTicketDetail(false)}>
          <section className="ticket-detail-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-handle" />
            <button className="modal-close" onClick={() => setShowTicketDetail(false)} aria-label="Đóng"><X size={20} /></button>
            <div className="detail-cover" style={{ backgroundImage: `url(${selectedTicket.image})` }}>
              {selectedTicket.badge && <span>{selectedTicket.badge}</span>}
            </div>
            <div className="detail-content">
              <span className="detail-kicker">{selectedTicket.category === "combo" ? "COMBO TRẢI NGHIỆM" : selectedTicket.category === "sunset" ? "VÉ SAU 17H" : "VÉ NÚI BÀ ĐEN"}</span>
              <h2>{selectedTicket.name}</h2>
              <p className="detail-subtitle">{selectedTicket.subtitle}</p>

              <div className="detail-meta">
                <label className="detail-date-field">
                  <CalendarDays size={16} />
                  <small>Ngày sử dụng · Chạm để đổi</small>
                  <strong>{new Date(`${date}T00:00:00`).toLocaleDateString("vi-VN")}</strong>
                  <ChevronDown className="date-chevron" size={14} />
                  <input
                    aria-label="Chọn ngày sử dụng"
                    type="date"
                    value={date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </label>
                <span><Clock3 size={16} /><small>Khung giờ</small><strong>{night ? "Sau 17:00" : "06:00 – 20:00"}</strong></span>
              </div>

              {selectedTicket.period === "flexible" && (
                <div className="time-choice detail-time">
                  <button className={!night ? "active" : ""} onClick={() => setNight(false)}><SunMedium size={16} /> Vé ngày</button>
                  <button className={night ? "active" : ""} onClick={() => setNight(true)}><Sparkles size={16} /> Sau 17h</button>
                </div>
              )}

              <div className="included-box">
                <strong>Quyền lợi bao gồm</strong>
                {selectedTicket.includes.map((item) => <span key={item}><Check size={14} /> {item}</span>)}
              </div>

              <div className="detail-quantity">
                <div>
                  <p><strong>Người lớn</strong><small>Từ 140cm trở lên</small></p>
                  <span><b>{money(unitAdult)}</b></span>
                  <div className="stepper"><button disabled={adult === 0} onClick={() => setAdult(Math.max(0, adult - 1))}><Minus size={15} /></button><b>{adult}</b><button onClick={() => setAdult(adult + 1)}><Plus size={15} /></button></div>
                </div>
                <div>
                  <p><strong>Trẻ em</strong><small>Từ 100cm đến dưới 140cm</small></p>
                  <span><b>{money(unitChild)}</b></span>
                  <div className="stepper"><button disabled={child === 0} onClick={() => setChild(Math.max(0, child - 1))}><Minus size={15} /></button><b>{child}</b><button onClick={() => setChild(child + 1)}><Plus size={15} /></button></div>
                </div>
              </div>

              <div className="detail-total"><span>Tổng tiền <small>Đã gồm thuế</small></span><strong>{money(total)}</strong></div>
              <div className="detail-actions">
                <button className="outline" onClick={() => addToCart(false)}><ShoppingCart size={17} /> Thêm giỏ hàng</button>
                <button onClick={() => addToCart(true)}>Đặt ngay</button>
              </div>
            </div>
          </section>
        </div>
      )}

      {showCart && (
        <div className="modal-backdrop cart-modal" onClick={() => setShowCart(false)}>
          <section className="cart-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="cart-title"><div><span>ĐƠN HÀNG CỦA BẠN</span><h2>Giỏ vé <b>{cartQuantity}</b></h2></div><button onClick={() => setShowCart(false)} aria-label="Đóng"><X size={20} /></button></div>
            <div className="cart-trip"><CalendarDays size={17} /><div><small>Ngày đi</small><strong>{new Date(`${date}T00:00:00`).toLocaleDateString("vi-VN")}</strong></div><button onClick={() => { setShowCart(false); setShowGuestPicker(true); }}>Thay đổi</button></div>
            {cart.length === 0 ? (
              <div className="cart-empty"><ShoppingCart size={38} /><strong>Giỏ vé đang trống</strong><span>Chọn một trải nghiệm để bắt đầu.</span><button onClick={() => setShowCart(false)}>Xem danh sách vé</button></div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => {
                    const itemAdultPrice = adultPriceFor(item.product, item.night);
                    const itemChildPrice = childPriceFor(item.product, item.night);
                    const itemTotal = item.adult * itemAdultPrice + item.child * itemChildPrice;
                    return (
                      <article key={`${item.product.id}-${item.night}`}>
                        <div className="cart-thumb" style={{ backgroundImage: `url(${item.product.image})` }} />
                        <div><strong>{item.product.name}</strong><small>{item.night ? "Sau 17:00" : "Vé ngày"} · {item.adult} NL · {item.child} TE</small><b>{money(itemTotal)}</b></div>
                        <button aria-label={`Xóa ${item.product.name}`} onClick={() => setCart((current) => current.filter((cartItem) => cartItem !== item))}><Trash2 size={17} /></button>
                      </article>
                    );
                  })}
                </div>
                <div className="cart-note"><ShieldCheck size={18} /><span>Vé QR sẽ được gửi sau khi đơn hàng được xác nhận.</span></div>
                <div className="cart-checkout">
                  <div><span>Tổng thanh toán</span><strong>{money(cartTotal)}</strong></div>
                  <button onClick={contactZalo}>Tiếp tục qua Zalo <ChevronRight size={17} /></button>
                </div>
              </>
            )}
          </section>
        </div>
      )}

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
