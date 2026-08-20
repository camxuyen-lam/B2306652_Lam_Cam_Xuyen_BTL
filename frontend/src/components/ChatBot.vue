<template>
  <div class="chatbot-container">
    <transition name="slide-up">
      <div v-if="isOpen" class="chat-window shadow-lg">
        <div class="chat-header">
          <div class="d-flex align-items-center">

            <div class="bot-avatar-small mr-2">
  <img src="https://i.pinimg.com/736x/09/7d/f7/097df7f4d1ad14313cc0f2d830ba3036.jpg" 
       alt="bot-avatar" 
       class="img-bot-small">
</div>
            <span>Trợ lý Thư viện</span>
          </div>
          <button class="close-btn" @click="isOpen = false">&times;</button>
        </div>

        <div class="chat-body" ref="chatBody">
          <div v-for="(msg, index) in messages" :key="index" :class="['msg-wrapper', msg.role]">
            <div class="msg-text">{{ msg.text }}</div>
          </div>
        </div>

        <div class="chat-footer">
          <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Hỏi tui đi nè..." />
          <button @click="sendMessage"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    </transition>

    <div class="bot-trigger" @click="isOpen = !isOpen" v-if="!isOpen">
      <div class="chat-bubble">Bạn cần tui giúp gì hông?</div>
      <div class="floating-btn shadow-lg">
<span class="bot-icon">
  <img src="https://i.pinimg.com/736x/09/7d/f7/097df7f4d1ad14313cc0f2d830ba3036.jpg" 
       alt="bot" 
       class="img-bot-btn">
</span>        <div class="pulse-ring"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      userInput: "",
      messages: [{ role: 'bot', text: 'Chào bạn! Tui là AI đây. Bạn muốn hỏi gì về sách hay tiền phạt hông?' }],
      knowledgeBase: [
        { keywords: ['mượn', 'quy trình'], response: 'Bạn cứ chọn sách rồi vào giỏ hàng bấm mượn là xong nha!' },
        { keywords: ['phạt', 'tiền'], response: 'Trễ 1 ngày phạt 5k nha bạn, nhớ trả đúng hạn nhe!' },
        { keywords: ['mất', 'đền'], response: 'Làm mất sách là phải đền bằng tiền giá trị sách đó bạn ơi!' },
    
  { 
    keywords: ['chào', 'hi', 'hello', 'ơi', 'alo'], 
    response: 'Chào bạn nhe! Tui là trợ lý của Rose Library đây. Bạn cần tui tư vấn mượn sách hay xem tiền phạt nè? 😉' 
  },
  { 
    keywords: ['ai đấy', 'là ai', 'tên gì'], 
    response: 'Tui là Robot thông minh của thư viện Rose! Nhiệm vụ của tui là giúp bạn mượn sách mà không cần đợi Admin rep đó.' 
  },

  { 
    keywords: ['mượn', 'quy trình', 'làm sao', 'hướng dẫn'], 
    response: 'Dễ lắm bạn! Bạn vào trang chủ -> Chọn sách -> Bấm "Thêm vào giỏ". Sau đó vào Giỏ hàng chọn "Mượn tất cả". Đợi Admin duyệt là bạn qua lấy sách về đọc thôi!' 
  },
  { 
    keywords: ['bao nhiêu', 'tối đa', 'mấy cuốn'], 
    response: 'Mỗi lần bạn được mượn tối đa 5 cuốn nhe! Mượn nhiều quá đọc không hết Admin đòi đó. 😂' 
  },
  { 
    keywords: ['bao lâu', 'mấy ngày', 'thời hạn'], 
    response: 'Thường thì bạn được giữ sách trong 14 ngày nhe. Nếu muốn đọc thêm thì nhớ gia hạn hoặc trả rồi mượn lại nha bạn.' 
  },

  { 
    keywords: ['tiền phạt', 'trễ hạn', 'quá hạn', 'nộp phạt'], 
    response: 'Huhu, bạn trả trễ là bị phạt 5.000đ/ngày đó nhe! Bạn vào mục "Cá nhân" -> "Lịch sử" để xem mình có bị dính án phạt nào không nha.' 
  },
  { 
    keywords: ['mất sách', 'làm hỏng', 'đền'], 
    response: 'Ối giời! Nếu làm mất hoặc hư sách thì bạn phải đền tiền bằng đúng giá trị cuốn sách đó cộng với phí xử lý nhe bạn. Giữ sách cẩn thận giùm tui nha! 😭' 
  },
  { 
    keywords: ['thanh toán', 'đóng tiền'], 
    response: 'Bạn mang tiền mặt qua quầy gặp Admin để đóng phạt trực tiếp hoặc chuyển khoản nhe. Đóng xong Admin mới cho mượn tiếp đó bạn.' 
  },

  { 
    keywords: ['có sách gì', 'thể loại', 'loại sách'], 
    response: 'Thư viện mình có đủ loại từ Trinh thám, Ngôn tình, Kinh tế đến Sách giáo khoa luôn. Bạn dùng thanh tìm kiếm ở trang chủ để tìm cho nhanh nhe!' 
  },
  { 
    keywords: ['tìm ở đâu', 'tìm kiếm'], 
    response: 'Bạn nhìn lên phía trên trang chủ có cái ô "Tìm kiếm sách..." đó, gõ tên sách hoặc tác giả vào là ra ngay.' 
  },

  { 
    keywords: ['tài khoản', 'cá nhân', 'profile'], 
    response: 'Bạn bấm vào cái Avatar góc trên bên phải để vào trang cá nhân nhe. Trong đó có đủ thông tin mượn trả của bạn luôn.' 
  },
  { 
    keywords: ['đổi mật khẩu', 'cài đặt'], 
    response: 'Bạn vào mục "Cài đặt" trong menu avatar để đổi thông tin cá nhân hoặc mật khẩu nhe.' 
  },

  { 
    keywords: ['mấy giờ', 'mở cửa', 'lịch'], 
    response: 'Rose Library mở cửa từ 7h30 sáng đến 21h00 tối, từ Thứ 2 đến Thứ 7 nhe bạn. Chủ nhật tui đi ngủ rồi! 😴' 
  },
  { 
    keywords: ['địa chỉ', 'ở đâu'], 
    response: 'Thư viện mình nằm ở khu trung tâm, bạn cứ theo bản đồ trên trang liên hệ là tới nhe!' 
  },
  { 
    keywords: ['admin', 'liên hệ', 'sđt', 'hotline'], 
    response: 'Bạn cần gấp thì gọi hotline: 0123.456.789 hoặc nhắn tin qua Fanpage thư viện nhe bạn!' 
  },

  { 
    keywords: ['yêu', 'thích', 'xinh'], 
    response: 'Ngại quá đi! Tui chỉ là Robot thôi nhưng nghe bạn khen tui cũng vui lắm nè. ❤️' 
  },
  { 
    keywords: ['buồn', 'chán'], 
    response: 'Đừng buồn bạn ơi! Mượn ngay một cuốn truyện cười trong thư viện đọc là hết buồn liền hà. 😂' 
  }

    ]
    };
  },
  methods: {
    sendMessage() {
      if (!this.userInput.trim()) return;
      this.messages.push({ role: 'user', text: this.userInput });
      const input = this.userInput.toLowerCase();
      this.userInput = "";

      setTimeout(() => {
        let reply = "Câu này khó quá, tui chưa học tới. Bạn hỏi Admin nhe! 😂";
        for (let item of this.knowledgeBase) {
          if (item.keywords.some(key => input.includes(key))) {
            reply = item.response;
            break;
          }
        }
        this.messages.push({ role: 'bot', text: reply });
        this.$nextTick(() => {
          const body = this.$refs.chatBody;
          if(body) body.scrollTop = body.scrollHeight;
        });
      }, 600);
    }
  }
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.floating-btn {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #ff8c5a, #ff5f6d);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  animation: float 3s ease-in-out infinite; 
}

.bot-icon { font-size: 35px; }

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #ff8c5a;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}

.chat-bubble {
  position: absolute;
  top: -50px;
  right: 10px;
  background: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  white-space: nowrap;
  animation: bounceIn 1s ease;
}

.chat-window {
  width: 320px;
  height: 450px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 20px;
}

.chat-header {
  background: #ff8c5a;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-body {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #fdfdfd;
}

.msg-wrapper { margin-bottom: 15px; display: flex; }
.msg-wrapper.user { justify-content: flex-end; }
.msg-text {
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
}
.bot .msg-text { background: #f0f0f0; color: #333; border-bottom-left-radius: 2px; }
.user .msg-text { background: #ff8c5a; color: white; border-bottom-right-radius: 2px; }

.chat-footer {
  padding: 10px 15px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
}

.chat-footer input {
  flex: 1;
  border: none;
  outline: none;
  padding: 8px;
}

.chat-footer button {
  background: none;
  border: none;
  color: #ff8c5a;
  font-size: 20px;
}
.img-bot-small {
  width: 30px; 
  height: 30px;
  border-radius: 50%; 
  object-fit: cover;  
}

.bot-icon img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s ease; }
.slide-up-enter, .slide-up-leave-to { transform: translateY(50px); opacity: 0; }
</style>