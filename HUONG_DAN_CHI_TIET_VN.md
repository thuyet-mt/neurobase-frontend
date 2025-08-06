# 🧠 Neurobase Frontend - Hướng dẫn chi tiết

Ứng dụng frontend React hiện đại cho hệ thống quản lý doanh nghiệp Neurobase, được thiết kế để chạy trong PyQt6 WebEngine cho các ứng dụng desktop.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt & Thiết lập](#cài-đặt--thiết-lập)
- [Phát triển](#phát-triển)
- [Kiến trúc](#kiến-trúc)
- [Components](#components)
- [Đa ngôn ngữ](#đa-ngôn-ngữ)
- [Hệ thống Theme](#hệ-thống-theme)
- [Hệ thống Cursor 3D](#hệ-thống-cursor-3d)
- [Tích hợp Backend](#tích-hợp-backend)
- [Xử lý sự cố](#xử-lý-sự-cố)
- [Build Production](#build-production)
- [Đóng góp](#đóng-góp)

## 🎯 Tổng quan

Neurobase Frontend là một ứng dụng React phức tạp phục vụ như giao diện người dùng cho hệ thống quản lý doanh nghiệp toàn diện. Nó được thiết kế đặc biệt để tích hợp với các ứng dụng backend Python thông qua PyQt6 WebEngine, cung cấp trải nghiệm desktop mượt mà.

### Đặc điểm chính:
- **Thiết kế Desktop-First**: Tối ưu hóa cho tích hợp PyQt6 WebEngine
- **Hỗ trợ đa ngôn ngữ**: Hỗ trợ sẵn cho tiếng Anh, tiếng Việt và tiếng Pháp
- **Theme động**: Ba theme riêng biệt (Sáng, Tối, Cân bằng)
- **Cursor 3D tương tác**: Cursor 3D tùy chỉnh với các model theo theme
- **Layout responsive**: Thích ứng với các kích thước màn hình khác nhau
- **Giao tiếp thời gian thực**: Tích hợp WebChannel với backend Python

## ✨ Tính năng

### 🎨 Giao diện người dùng
- **Thiết kế hiện đại**: Giao diện sạch sẽ, chuyên nghiệp với điểm nhấn màu vàng
- **Layout responsive**: Thích ứng với các kích thước màn hình và hướng khác nhau
- **Phần tử tương tác**: Hiệu ứng hover, animation và phản hồi trực quan
- **Khả năng tiếp cận**: Hỗ trợ độ tương phản cao và giảm chuyển động

### 🌐 Đa ngôn ngữ
- **Hỗ trợ đa ngôn ngữ**: Tiếng Anh, tiếng Việt, tiếng Pháp
- **Chuyển đổi ngôn ngữ động**: Thay đổi ngôn ngữ theo thời gian thực
- **Hệ thống fallback**: Giảm dần một cách duyên dáng khi không có file ngôn ngữ
- **Nội dung được bản địa hóa**: Tất cả phần tử UI được dịch đúng cách

### 🎭 Hệ thống Theme
- **Ba Theme**: Chế độ Sáng, Tối và Cân bằng
- **Chuyển đổi động**: Thay đổi theme theo thời gian thực
- **Cài đặt bền vững**: Tùy chọn theme được lưu trong localStorage
- **Styling nhất quán**: Tất cả components thích ứng với theme hiện tại

### 🎯 Hệ thống Cursor 3D
- **Model 3D tùy chỉnh**: Model robot tay theo từng theme
- **Animation tương tác**: Hiệu ứng click và hover
- **Tối ưu hiệu suất**: Render hiệu quả với Three.js
- **Tích hợp Theme**: Hình dạng cursor phù hợp với theme hiện tại

### 🔧 Tích hợp Backend
- **Giao tiếp WebChannel**: Giao tiếp trực tiếp với backend Python
- **Actions dựa trên Slot**: Gọi các method Python từ React components
- **Xử lý lỗi**: Quản lý lỗi toàn diện
- **Mock Server**: Server phát triển để test mà không cần backend

## 🛠 Công nghệ sử dụng

### Framework Frontend
- **React 19.1.0**: React mới nhất với các tính năng hiện đại
- **Vite 7.0.4**: Công cụ build nhanh và development server
- **ESLint**: Chất lượng code và tính nhất quán

### Đồ họa 3D
- **Three.js**: Thư viện đồ họa 3D cho hệ thống cursor
- **GLTFLoader**: Tải model 3D
- **WebGL**: Render tăng tốc phần cứng

### Styling & UI
- **CSS Modules**: Styling có phạm vi
- **Responsive Design**: Tiếp cận mobile-first
- **Custom Icons**: Hệ thống icon dựa trên SVG

### Công cụ phát triển
- **Concurrently**: Chạy nhiều process
- **Express**: Mock server cho phát triển
- **CORS**: Chia sẻ tài nguyên cross-origin

## 📁 Cấu trúc dự án

```
neurobase-frontend/
├── src/
│   ├── components/          # React UI components
│   │   ├── Neurobase.jsx   # Component chính của ứng dụng
│   │   ├── Cursor3D.jsx    # Hệ thống cursor 3D
│   │   ├── MenuButton.jsx  # Menu điều hướng
│   │   ├── ModeButton.jsx  # Chuyển đổi theme
│   │   ├── ProgressBar.jsx # Theo dõi tiến độ
│   │   └── ...             # Các UI components khác
│   ├── contexts/           # React Context providers
│   │   ├── LanguageContext.js    # Hỗ trợ đa ngôn ngữ
│   │   └── ThemeContext.js       # Quản lý theme
│   ├── services/           # Business logic services
│   │   ├── WebChannelService.js  # Giao tiếp backend
│   │   └── ErrorBoundary.jsx     # Xử lý lỗi
│   ├── assets/             # Tài nguyên tĩnh
│   │   ├── *.svg          # File icon
│   │   ├── *.png          # File hình ảnh
│   │   └── *.glb          # Model 3D
│   ├── constants/          # Hằng số cấu hình
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Hàm tiện ích
├── public/                 # Tài nguyên công khai
├── mock-language-server.js # Mock server cho phát triển
├── vite.config.js         # Cấu hình Vite
└── package.json           # Dependencies và scripts
```

## 🚀 Cài đặt & Thiết lập

### Yêu cầu hệ thống
- **Node.js**: Phiên bản 18 trở lên
- **npm**: Package manager (đi kèm với Node.js)
- **Git**: Hệ thống quản lý phiên bản

### Bước 1: Clone Repository
```bash
git clone <repository-url>
cd neurobase-frontend
```

### Bước 2: Cài đặt Dependencies
```bash
npm install
```

### Bước 3: Khởi động Development Server

#### Tùy chọn A: Phát triển độc lập (Khuyến nghị cho người mới)
```bash
npm run dev
```
Điều này sẽ khởi động ứng dụng với dữ liệu fallback có sẵn.

#### Tùy chọn B: Với Mock Server (Cho trải nghiệm phát triển đầy đủ)
```bash
npm run dev:mock
```
Điều này khởi động cả Vite dev server và mock language server.

#### Tùy chọn C: Với Backend thật
```bash
# Terminal 1: Khởi động Python backend
cd ../neuro-core
python neuro_core/ui/reception_module.py

# Terminal 2: Khởi động frontend
npm run dev
```

### Bước 4: Truy cập ứng dụng
Mở trình duyệt và điều hướng đến:
- **Development**: http://localhost:5173
- **Mock Server**: http://localhost:3001 (health check)

## 🔧 Phát triển

### Scripts có sẵn

```bash
npm run dev          # Khởi động development server
npm run dev:mock     # Khởi động với mock server
npm run mock-server  # Chỉ khởi động mock server
npm run build        # Build cho production
npm run preview      # Xem trước production build
npm run lint         # Chạy ESLint
```

### Quy trình phát triển

1. **Khởi động Development Server**:
   ```bash
   npm run dev:mock
   ```

2. **Thực hiện thay đổi**: Chỉnh sửa file trong thư mục `src/`

3. **Hot Reload**: Thay đổi tự động phản ánh trong trình duyệt

4. **Testing**: Sử dụng browser console để test tính năng:
   ```javascript
   // Thay đổi ngôn ngữ
   localStorage.setItem('language', 'vi');
   
   // Thay đổi theme
   localStorage.setItem('theme', 'dark');
   ```

## 🏗 Kiến trúc

### Kiến trúc Component
Ứng dụng tuân theo cấu trúc component phân cấp:

```
App.jsx
├── ErrorBoundary
├── LanguageProvider
├── ThemeProvider
├── Cursor3D
├── NotificationSystem
└── Neurobase
    ├── Background
    ├── Logo
    ├── Navigation Buttons
    ├── Progress Bar
    ├── Mode Button
    └── Menu Button
```

### Quản lý State
- **React Context**: Cho state toàn cục (ngôn ngữ, theme)
- **Local State**: Cho state cụ thể của component
- **localStorage**: Cho các tùy chọn bền vững

### Luồng giao tiếp
```
React Component → WebChannel Service → Python Backend
                ↓
            Error Handling → User Notification
```

## 🧩 Components

### Core Components

#### Neurobase.jsx
Component chính của ứng dụng điều phối toàn bộ UI.

**Tính năng chính:**
- Quản lý layout
- Xử lý sự kiện button
- Tích hợp WebChannel
- Thiết kế responsive

#### Cursor3D.jsx
Hệ thống cursor 3D tùy chỉnh sử dụng Three.js.

**Tính năng:**
- Model 3D theo theme
- Theo dõi chuột
- Animation click
- Tối ưu hiệu suất

#### LanguageContext.js
Quản lý hỗ trợ đa ngôn ngữ trong toàn bộ ứng dụng.

**Khả năng:**
- Tải ngôn ngữ động
- Cơ chế fallback
- Chuyển đổi ngôn ngữ thời gian thực
- Xử lý lỗi

#### ThemeContext.js
Xử lý chuyển đổi theme và styling.

**Tính năng:**
- Ba chế độ theme (light, dark, balance)
- Lưu trữ theme bền vững
- Cập nhật styling động

### UI Components

#### MenuButton.jsx
Menu điều hướng với chức năng dropdown.

#### ModeButton.jsx
Button chuyển đổi theme với phản hồi trực quan.

#### ProgressBar.jsx
Theo dõi tiến độ tương tác với chức năng kéo thả.

#### NotificationSystem.jsx
Hệ thống phản hồi người dùng cho các hành động và lỗi.

## 🌐 Đa ngôn ngữ

### Ngôn ngữ được hỗ trợ
- **English (en)**: Ngôn ngữ mặc định
- **Vietnamese (vi)**: Tiếng Việt
- **French (fr)**: Tiếng Pháp

### Cấu trúc file ngôn ngữ
```json
{
  "neurobase_window": {
    "title": "Neurobase",
    "telephone": "Điện thoại",
    "archives": "Tủ sách",
    // ... thêm bản dịch
  }
}
```

### Thay đổi ngôn ngữ
```javascript
// Browser console
localStorage.setItem('language', 'vi'); // Tiếng Việt
localStorage.setItem('language', 'en'); // Tiếng Anh
localStorage.setItem('language', 'fr'); // Tiếng Pháp
```

### Hệ thống Fallback
Khi file ngôn ngữ không có sẵn:
1. App cố gắng tải ngôn ngữ được yêu cầu
2. Fallback về tiếng Anh nếu tải thất bại
3. Sử dụng dữ liệu tiếng Anh có sẵn làm fallback cuối cùng
4. Tiếp tục hoạt động bình thường

## 🎨 Hệ thống Theme

### Theme có sẵn

#### Light Theme
- **Background**: #E4DAC2 (Beige ấm)
- **Text**: Màu tối để tương phản
- **Accents**: Điểm nhấn màu vàng

#### Dark Theme
- **Background**: #030303 (Đen sâu)
- **Text**: Màu sáng để tương phản
- **Accents**: Điểm nhấn vàng tinh tế

#### Balanced Theme
- **Background**: #615637 (Nâu phong phú)
- **Text**: Tương phản cân bằng
- **Accents**: Phần tử vàng nổi bật

### Chuyển đổi Theme
```javascript
// Browser console
localStorage.setItem('theme', 'light');
localStorage.setItem('theme', 'dark');
localStorage.setItem('theme', 'balance');
```

### Tích hợp Theme
- Tất cả components tự động thích ứng với thay đổi theme
- Model cursor 3D thay đổi dựa trên theme
- Bảng màu cập nhật theo thời gian thực
- Tùy chọn theme bền vững

## 🎯 Hệ thống Cursor 3D

### Tổng quan
Ứng dụng có cursor 3D tùy chỉnh thay thế cursor chuột mặc định bằng các model 3D tương tác.

### Tính năng
- **Model theo Theme**: Các model 3D khác nhau cho từng theme
- **Animation tương tác**: Hiệu ứng click và hover
- **Tối ưu hiệu suất**: Render hiệu quả với Three.js
- **Responsive**: Thích ứng với các kích thước màn hình khác nhau

### File Model
- `hand_robot_dark_v2.glb`: Cursor theme tối
- `hand_robot_balance_v2.glb`: Cursor theme cân bằng
- `hand_robot_balance_v2.glb`: Cursor theme sáng/cân bằng

### Triển khai kỹ thuật
```javascript
// Cursor theo chuyển động chuột
const handleMouseMove = (e) => {
  setMousePosition({ x: e.clientX, y: e.clientY });
};

// Tải model theo theme
const getModelPath = (theme) => {
  switch (theme) {
    case 'dark': return '/neuro_core/config/models_3d/hand_robot_dark_v2.glb';
    case 'balance': return '/neuro_core/config/models_3d/hand_robot_balance_v2.glb';
case 'light': return '/neuro_core/config/models_3d/hand_robot_balance_v2.glb';
  }
};
```

## 🔌 Tích hợp Backend

### WebChannel Service
Ứng dụng giao tiếp với backend Python thông qua hệ thống WebChannel của Qt.

#### Các Method chính
```javascript
// Điều hướng
await webChannelService.goBack();
await webChannelService.navigateToHome();

// Hành động tính năng
await webChannelService.openArchives();
await webChannelService.openTelephone();
await webChannelService.openReunions();

// Hành động hệ thống
await webChannelService.changeTheme('dark');
await webChannelService.updateProgress(75);
await webChannelService.shutdown();
```

#### Xử lý lỗi
```javascript
const callSlotWithNotification = async (slotMethod, successMessage, errorMessage) => {
  try {
    await slotMethod();
    showNotificationWithMessage(successMessage);
  } catch (error) {
    console.error('Slot call failed:', error);
    showNotificationWithMessage(errorMessage || 'Action failed');
  }
};
```

### Mock Server
Cho phát triển mà không cần backend thật:

```javascript
// Mock server cung cấp:
- File ngôn ngữ tại /langs/{language}.json
- Health check tại /health
- Hỗ trợ CORS
- Cơ chế fallback
```

## 🐛 Xử lý sự cố

### Các vấn đề thường gặp

#### 1. Lỗi "Unexpected token '<'"
**Vấn đề**: App nhận HTML thay vì JSON từ server.

**Giải pháp**:
```bash
# Sử dụng phát triển độc lập
npm run dev

# Hoặc đảm bảo mock server đang chạy
npm run dev:mock
```

#### 2. Lỗi CORS
**Vấn đề**: Vấn đề chia sẻ tài nguyên cross-origin.

**Giải pháp**:
```bash
# Đảm bảo mock server đang chạy
npm run mock-server

# Kiểm tra port 3001 có sẵn không
curl http://localhost:3001/health
```

#### 3. Model 3D không tải được
**Vấn đề**: Model cursor 3D không tải được.

**Giải pháp**:
- Kiểm tra file model có tồn tại trong `/neuro_core/config/models_3d/`
- Xác minh quyền file
- Kiểm tra browser console để biết lỗi cụ thể

#### 4. App không tải được
**Vấn đề**: Ứng dụng không khởi động được.

**Giải pháp**:
```bash
# Xóa dependencies và cài đặt lại
rm -rf node_modules package-lock.json
npm install

# Khởi động development server
npm run dev
```

### Chế độ Debug
Bật logging chi tiết:
```javascript
// Browser console
localStorage.setItem('debug', 'true');
```

### Vấn đề hiệu suất
- **Cursor 3D**: Giảm kích thước cursor trong component Cursor3D
- **Animation**: Tắt animation để hiệu suất tốt hơn
- **Memory**: Kiểm tra memory leak trong browser dev tools

## 📦 Build Production

### Build cho Production
```bash
npm run build
```

Điều này tạo ra các file tối ưu trong thư mục `dist/`.

### Output Build
```
dist/
├── index.html          # File HTML chính
├── assets/             # Tài nguyên tối ưu
│   ├── *.js           # JavaScript đã bundle
│   ├── *.css          # CSS đã minify
│   └── *.png          # Hình ảnh đã tối ưu
```

### Triển khai
1. **Copy thư mục dist/** vào web server
2. **Cấu hình server** để serve static files
3. **Thiết lập routing** cho single-page application
4. **Test kỹ lưỡng** trong môi trường production

### Tối ưu hiệu suất
- **Code Splitting**: Tự động với Vite
- **Tối ưu tài nguyên**: Hình ảnh và font được tối ưu
- **Tree Shaking**: Loại bỏ code không sử dụng
- **Minification**: JavaScript và CSS được minify

## 🤝 Đóng góp

### Hướng dẫn phát triển

#### Code Style
- Sử dụng cấu hình ESLint
- Tuân theo React best practices
- Viết commit message có ý nghĩa
- Thêm comment cho logic phức tạp

#### Cấu trúc Component
```javascript
// Template component
import React from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2, children }) => {
  // State và effects
  const [state, setState] = useState(initialValue);
  
  // Event handlers
  const handleClick = () => {
    // Logic handler
  };
  
  // Render
  return (
    <div className="component-name">
      {children}
    </div>
  );
};

export default ComponentName;
```

#### Testing
- Test components trong các theme khác nhau
- Xác minh hỗ trợ đa ngôn ngữ
- Kiểm tra responsive design
- Validate accessibility

### Quy trình Pull Request
1. **Fork** repository
2. **Tạo** feature branch
3. **Thực hiện** thay đổi
4. **Test** kỹ lưỡng
5. **Submit** pull request

## 📄 License

Dự án này là phần mềm độc quyền. Tất cả quyền được bảo lưu.

## 📞 Hỗ trợ

Để được hỗ trợ kỹ thuật hoặc câu hỏi:
- **Tài liệu**: Kiểm tra README này và comment trong code
- **Vấn đề**: Báo cáo bug thông qua issue tracker
- **Phát triển**: Làm theo hướng dẫn xử lý sự cố ở trên

---

**Lưu ý**: Ứng dụng này được thiết kế để chạy trong PyQt6 WebEngine và có thể có chức năng hạn chế khi chạy trong trình duyệt web thông thường. Để có chức năng đầy đủ, tích hợp với backend Python phù hợp. 