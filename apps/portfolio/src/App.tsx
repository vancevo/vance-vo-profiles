import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { Menu, X, Moon, Sun, ArrowRight, ArrowUp } from 'lucide-react';

import { useAppStore } from './store/useAppStore';
import { translations } from './locales';
import Hero from './components/Hero';
import Objective from './components/Objective';
import Portfolio from './components/Portfolio';
import ExperienceSection from './components/Experience';
import Activity from './components/Activity';
import GithubHighlight from './components/GithubHighlight';
import Footer from './components/Footer';

// Mock dataloader until backend routes are fully seeded
const fetchPortfolioData = async ({ queryKey }: any) => {
  const [_, lang] = queryKey as [string, 'EN' | 'VN'];

  // Fetch Github Activity
  const contributionRes = await fetch('https://github-contributions-api.deno.dev/vancevo.json');
  const contributionData = await contributionRes.json();

  return {
    hero: {
      // role: {
      //   EN: "Frontend Developer & React Engineer",
      //   VN: "Lập Trình Viên Frontend & Kỹ Sư React"
      // },
      titleHighlight: {
        EN: "Frontend Developer",
        VN: "Lập Trình Viên Front-end"
      },
      titleSuffix: {
        EN: "React Engineer",
        VN: "Kỹ Sư React"
      },
      description: {
        EN: "Hi my name is Vance Vo, Frontend Developer with 4+ years of experience building scalable web applications and enterprise systems. Specialized in ERP, HRM, and dashboard development with a strong focus on performance optimization, large dataset handling, and maintainable architecture.",
        VN: "Xin chào, tôi là Vinh Võ, Lập trình viên Frontend với hơn 4 năm kinh nghiệm xây dựng ứng dụng web có khả năng mở rộng và hệ thống doanh nghiệp. Chuyên phát triển ERP, HRM và dashboard với trọng tâm là tối ưu hiệu năng, xử lý dữ liệu lớn và kiến trúc dễ bảo trì."
      }
    },
    objective: {
      p1: {
        EN: "I approach frontend development as a system design problem—translating complex business workflows into intuitive and efficient user interfaces. My focus is on building applications that remain stable and responsive even when handling large-scale data.",
        VN: "Tôi tiếp cận frontend như một bài toán thiết kế hệ thống—chuyển đổi các quy trình nghiệp vụ phức tạp thành giao diện trực quan và hiệu quả. Trọng tâm là xây dựng ứng dụng ổn định và mượt mà ngay cả khi xử lý dữ liệu lớn."
      },
      p2: {
        EN: "Through hands-on experience in ERP and HRM systems, I prioritize performance optimization, state management architecture, and reusable component design to ensure scalability, maintainability, and long-term product quality.",
        VN: "Thông qua kinh nghiệm thực tế với các hệ thống ERP và HRM, tôi ưu tiên tối ưu hiệu năng, kiến trúc quản lý state và thiết kế component tái sử dụng nhằm đảm bảo khả năng mở rộng, dễ bảo trì và chất lượng sản phẩm lâu dài."
      }
    },
    projects: [
      {
        id: "1",
        title: { EN: "Nam Viet ERP System", VN: "Hệ Thống ERP Nam Việt" },
        description: { EN: "A production-level ERP system for manufacturing workflow management. Built multiple modules including Production, Inventory, Accounting, and Reporting with high-performance data handling (10,000+ rows). Optimized rendering and API efficiency using React Query and memoization.", VN: "Hệ thống ERP cấp độ production phục vụ quản lý sản xuất. Xây dựng phân hệ Sản xuất, Tồn kho, Kế toán với khả năng xử lý mượt mà trên 10.000+ bản ghi. Tối ưu performance bằng React Query và memoization." },
        year: "2024-Present",
        tags: ["REACT", "TYPESCRIPT", "REDUX", "REACT QUERY", "TAILWIND-CSS"],
        image: "https://picsum.photos/seed/erp/1200/800"
      },
      {
        id: "2",
        title: { EN: "HRM Platform Dashboard", VN: "Nền Tảng Quản Lý Nhân Sự HRM" },
        description: { EN: "An internal HRM system supporting employee lifecycle, project tracking, and operational workflows. Developed dynamic dashboards with filtering, conditional rendering, and optimized component structure for maintainability.", VN: "Hệ thống HRM nội bộ quản lý vòng đời nhân viên và tiến độ dự án. Phát triển Dashboard động kèm filter dữ liệu, tối ưu độ bảo trì component." },
        year: "2022-2023",
        tags: ["SVELTE", "TYPESCRIPT", "TAILWIND-CSS"],
        image: "https://picsum.photos/seed/hrm/1200/800"
      },
      {
        id: "3",
        title: { EN: "Cattr Time Tracking System", VN: "Hệ Thống Theo Dõi Thời Gian Cattr" },
        description: { EN: "An internal time tracking system replacing third-party tools. Implemented time logging, validation, and real-time synchronization with backend services to ensure data accuracy.", VN: "Hệ thống Tracking thời gian nội bộ thay thế giải pháp bên thứ 3. Tích hợp validation và đồng bộ realtime với backend." },
        year: "2022-2023",
        tags: ["REACT", "TYPESCRIPT", "BOOTSTRAP"],
        image: "https://picsum.photos/seed/cattr/1200/800"
      },
      {
        id: "4",
        title: {
          EN: "Web Development Lecturer",
          VN: "Giảng Viên Lập Trình Web"
        },
        description: {
          EN: "Designed and delivered a web development training program covering HTML, CSS, JavaScript, and Python. Mentored students through hands-on projects and capstone assignments, focusing on building foundational programming skills and problem-solving abilities.",
          VN: "Thiết kế và giảng dạy chương trình đào tạo lập trình web gồm HTML, CSS, JavaScript và Python. Hướng dẫn học viên thông qua các dự án thực hành và capstone, tập trung xây dựng nền tảng lập trình và kỹ năng giải quyết vấn đề."
        },
        year: "2021",
        tags: ["HTML", "CSS", "JAVASCRIPT", "PYTHON"],
        image: "https://picsum.photos/seed/teky/1200/800"
      }
    ],
    experiences: [
      {
        id: "1",
        company: { EN: "Nam Viet Packaging", VN: "Bao Bì Nam Việt" },
        role: { EN: "Frontend Developer", VN: "Lập Trình Viên Frontend" },
        period: "Oct 2024 — Present",
        description: [
          { EN: "Developed and maintained a large-scale ERP system covering Production, Inventory, Accounting, and Reporting modules", VN: "Phát triển và bảo trì hệ thống ERP quy mô lớn gồm Sản xuất, Kho bãi, Kế toán và Báo cáo." },
          { EN: "Designed reusable UI components (tables, forms, modals) used across multiple modules", VN: "Thiết kế tái sử dụng UI component đa nền tảng (Bảng, Modal, Form)." },
          { EN: "Managed global and server state using Redux and React Query", VN: "Quản trị State cục bộ và Server bằng Redux, React Query." },
          { EN: "Optimized performance for large datasets (1,000–10,000+ rows) using memoization and lazy loading", VN: "Tối ưu hóa bảng dữ liệu tới 10.000+ dòng." },
          { EN: "Reduced API calls and improved caching strategies with React Query", VN: "Giảm độ trễ API gọi tự do nhờ vào cache." },
          { EN: "Collaborated in Agile environment with cross-functional teams", VN: "Làm việc theo môi trường Agile/Scrum liên bộ phận." }
        ]
      },
      {
        id: "2",
        company: { EN: "Designveloper (DSV)", VN: "Designveloper (DSV)" },
        role: { EN: "Frontend Developer", VN: "Lập Trình Viên Frontend" },
        period: "Apr 2022 — May 2024",
        description: [
          { EN: "Developed HRM platform modules including Users, Projects, Timesheet, and OKRs", VN: "Phát triển nền tảng quản trị nhân sự HRM (Dự án, Bấm giờ, OKRs)." },
          { EN: "Built dynamic dashboards with filtering and real-time data updates", VN: "Xây dựng dashboard động lọc thông tin trực tiếp theo real-time." },
          { EN: "Improved component architecture to reduce re-renders and enhance maintainability", VN: "Cải thiện luồng architecture chống re-render vô ích." },
          { EN: "Worked with Svelte and TypeScript in production systems", VN: "Kinh nghiệm làm việc sâu Svelte và Typescript." },
          { EN: "Debugged and resolved UI issues in live environments", VN: "Sửa lỗi UI ngay trên các phiên bản chạy Production Live." }
        ]
      },
      {
        id: "3",
        company: { EN: "Teky Academy", VN: "Học Viện Teky" },
        role: { EN: "Web Development Lecturer", VN: "Giảng Viên Lập Trình Web" },
        period: "Apr 2021 — Apr 2022",
        description: [
          { EN: "Designed and delivered web development curriculum covering HTML, CSS, JavaScript, and Python", VN: "Thiết kế và giảng dạy chương trình lập trình web gồm HTML, CSS, JavaScript và Python" },
          { EN: "Mentored students through capstone projects and hands-on coding exercises", VN: "Hướng dẫn học viên thực hiện dự án capstone và bài tập thực hành" },
          { EN: "Planned structured lessons to improve problem-solving and logical thinking skills", VN: "Xây dựng lộ trình bài giảng giúp nâng cao tư duy logic và kỹ năng giải quyết vấn đề" },
          { EN: "Applied STEAM-based teaching methods to enhance learning effectiveness", VN: "Áp dụng phương pháp STEAM để tăng hiệu quả học tập" },
          { EN: "Supported students in developing communication, teamwork, and presentation skills", VN: "Hỗ trợ học viên phát triển kỹ năng giao tiếp, làm việc nhóm và thuyết trình" }
        ]
      }
    ],
    techStack: [
      {
        id: "1",
        name: { EN: "Programming", VN: "Ngôn Ngữ" },
        iconName: "Terminal",
        items: ["TypeScript", "JavaScript (ES6+)"]
      },
      {
        id: "2",
        name: { EN: "Frontend", VN: "Frontend Mảng" },
        iconName: "Layers",
        items: ["React", "Next.js", "Svelte"]
      },
      {
        id: "3",
        name: { EN: "State Management", VN: "Quản Trị State" },
        iconName: "Database",
        items: ["React Query", "Redux", "Zustand"]
      },
      {
        id: "4",
        name: { EN: "UI & Styling", VN: "Giao Diện CSS" },
        iconName: "Palette",
        items: ["TailwindCSS", "Ant Design", "CSS Grid", "Responsive Design"]
      },
      {
        id: "5",
        name: { EN: "Tools & Others", VN: "Công Cụ Mở Rộng" },
        iconName: "Settings",
        items: ["Vite", "Docker", "Jest", "REST API", "JWT Auth"]
      }
    ],
    github: [
      {
        id: 1,
        name: "Vance Vo Profile",
        description: "High performance UI.",
        html_url: "#",
        stargazers_count: "27.7k",
        language: "TypeScript",
        updated_at: new Date().toISOString()
      }
    ],
    activity: {
      totalContributions: contributionData.totalContributions || 0,
      contributions: contributionData.contributions.map((week: any) =>
        week.map((day: any) => ({
          date: day.date,
          count: day.contributionCount,
          level: day.contributionLevel === 'NONE' ? 0 :
            day.contributionLevel === 'FIRST_QUARTILE' ? 1 :
              day.contributionLevel === 'SECOND_QUARTILE' ? 2 :
                day.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4
        }))
      )
    }
  };
};

export default function App() {
  const { theme, isMenuOpen, setMenuOpen, toggleTheme, language, setLanguage } = useAppStore();
  const [activeSection, setActiveSection] = useState('objective');
  const t = translations[language as 'EN' | 'VN'];

  const { data, isLoading } = useQuery({
    queryKey: ['portfolioData', language],
    queryFn: fetchPortfolioData,
  });

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Intersection Observer for Active Navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = ['objective', 'portfolio', 'experience', 'github', 'activity'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getNavClass = (id: string) =>
    activeSection === id
      ? "text-primary border-b-2 border-primary pb-1"
      : "hover:text-primary transition-colors";

  return (
    <div className="min-h-screen selection:bg-primary/30 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-primary font-headline uppercase">
            {language === 'EN' ? 'VANCE VO' : 'VINH VÕ'}
          </div>

          <div className="hidden md:flex items-center gap-8 font-headline text-xs font-bold uppercase tracking-widest">
            <a href="#objective" onClick={() => setActiveSection('objective')} className={getNavClass('objective')}>{t.nav.objective}</a>
            <a href="#portfolio" onClick={() => setActiveSection('portfolio')} className={getNavClass('portfolio')}>{t.nav.portfolio}</a>
            <a href="#experience" onClick={() => setActiveSection('experience')} className={getNavClass('experience')}>{t.nav.experience}</a>
            <a href="#activity" onClick={() => setActiveSection('activity')} className={getNavClass('activity')}>{t.nav.activity}</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'EN' ? 'VN' : 'EN')}
              className="hidden sm:block text-[10px] font-headline font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
              {language === 'EN' ? 'Language (EN)' : 'Ngôn Ngữ (VN)'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-primary hover:bg-surface-container-high transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 text-primary"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-surface pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 font-headline text-2xl font-bold uppercase tracking-tighter">
              <a href="#objective" onClick={() => { setActiveSection('objective'); setMenuOpen(false); }}>{t.nav.objective}</a>
              <a href="#portfolio" onClick={() => { setActiveSection('portfolio'); setMenuOpen(false); }}>{t.nav.portfolio}</a>
              <a href="#experience" onClick={() => { setActiveSection('experience'); setMenuOpen(false); }}>{t.nav.experience}</a>
              <a href="#activity" onClick={() => { setActiveSection('activity'); setMenuOpen(false); }}>{t.nav.activity}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        <Hero heroData={data.hero} />
        <Objective techStack={data.techStack} objectiveData={data.objective} />
        <Portfolio projects={data.projects} />
        <ExperienceSection experiences={data.experiences} />
        <GithubHighlight repos={data.github} />
        <Activity activityData={data.activity} />
      </main>

      <Footer />

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-16 h-16 bg-primary text-white flex items-center justify-center shadow-2xl hover:bg-primary/90 transition-all active:scale-90 group rounded-none"
        >
          <ArrowUp className="w-8 h-8 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
