import { useState } from 'react';
import './App.css';

const ROWS = [
  { id: 1, chars: ['Đ', 'O', 'À', 'N', 'V', 'I', 'Ê', 'N'], length: 8, answer: 'ĐOÀN VIÊN' },
  { id: 2, chars: ['T', 'Ư', 'Ơ', 'N', 'G', 'L', 'A', 'I'], length: 8, answer: 'TƯƠNG LAI' },
  { id: 3, chars: ['N', 'Ă', 'M', 'X', 'U', 'N', 'G', 'K', 'Í', 'C', 'H'], length: 11, answer: 'NĂM XUNG KÍCH' },
  { id: 4, chars: ['S', 'Á', 'U', 'K', 'H', 'Á', 'T', 'V', 'Ọ', 'N', 'G'], length: 11, answer: 'SÁU KHÁT VỌNG' },
];

const ROW_DETAILS = {
  3: {
    title: '5 Xung kích (Chuyển đổi số)',
    items: [
      { bold: 'Nâng cao nhận thức số:', text: 'Tiên phong trong tư duy và hiểu biết về kỹ thuật số.' },
      { bold: 'Xây dựng, hoàn thiện thể chế số:', text: 'Tham gia đóng góp chính sách, pháp luật.' },
      { bold: 'Phát triển hạ tầng số:', text: 'Xây dựng hạ tầng dữ liệu, mạng lưới.' },
      { bold: 'Đào tạo nguồn nhân lực số:', text: 'Nâng cao kỹ năng số cho thanh niên và cộng đồng.' },
      { bold: 'Đổi mới sáng tạo, khởi nghiệp và văn hóa số:', text: 'Tạo ra các giá trị mới trên nền tảng số.' },
    ],
  },
  4: {
    title: '6 Khát vọng',
    items: [
      { bold: 'Đóng góp, cống hiến:', text: 'Vì sự phát triển của quốc gia.' },
      { bold: 'Học tập, rèn luyện:', text: 'Nâng cao trình độ.' },
      { bold: 'Đổi mới, sáng tạo:', text: 'Không ngừng tìm kiếm giải pháp mới.' },
      { bold: 'Lập thân, lập nghiệp:', text: 'Xây dựng sự nghiệp bền vững.' },
      { bold: 'Hội nhập, phát triển:', text: 'Vươn tầm quốc tế.' },
      { bold: 'Đoàn kết, phát huy sức mạnh tập thể:', text: 'Gắn kết sức mạnh toàn dân tộc.' },
    ],
  },
};

const NUM_TEAMS = 5;

// All questions now have 4 choices (A, B, C, D) with the correct answer index
const QUESTION_POOL = [
  {
    q: 'Xung kích trong đổi mới sáng tạo, khởi nghiệp, lập nghiệp và xây dựng _____ số là 1 trong 5 xung kích?',
    choices: ['Kinh tế', 'Xã hội', 'Văn hóa', 'Giáo dục'],
    correct: 2,
  },
  {
    q: 'Một trong "5 chủ động" để làm chủ KHCN là Chủ động trong học tập, nghiên cứu khoa học, ứng dụng _____?',
    choices: ['Công nghệ', 'Trí tuệ', 'Kỹ năng', 'Sáng tạo'],
    correct: 0,
  },
  {
    q: 'Ngày thành lập Đoàn TNCS Hồ Chí Minh là ngày tháng nào?',
    choices: ['26 tháng 3', '2 tháng 9', '19 tháng 5', '22 tháng 12'],
    correct: 0,
  },
  {
    q: 'Theo "5 chủ động", thanh niên cần chủ động trong giao lưu, _____ quốc tế?',
    choices: ['Hợp tác', 'Hội nhập', 'Giao thương', 'Liên kết'],
    correct: 3,
  },
  {
    q: 'Độ tuổi quy định để kết nạp Đội Thiếu niên Tiền phong là từ bao nhiêu tuổi?',
    choices: ['7 tuổi', '8 tuổi', '9 tuổi', '10 tuổi'],
    correct: 2,
  },
  {
    q: 'Khẩu hiệu của Đội viên là "Vì Tổ quốc XHCN, vì lý tưởng của Bác Hồ vĩ đại: .....!"?',
    choices: ['Quyết thắng', 'Sẵn sàng', 'Tiến lên', 'Xung phong'],
    correct: 3,
  },
  {
    q: 'Bậc học tiếp theo sau THPT mà nhiều thanh niên hướng tới?',
    choices: ['Cao đẳng', 'Trung cấp', 'Đại học', 'Nghề'],
    correct: 2,
  },
  {
    q: 'Anh hùng Lý Tự Trọng hy sinh khi mới bao nhiêu tuổi?',
    choices: ['15 tuổi', '16 tuổi', '17 tuổi', '18 tuổi'],
    correct: 2,
  },
  {
    q: 'Một trong "5 chủ động" là Chủ động đóng góp ý kiến, cải thiện môi trường _____?',
    choices: ['Học tập', 'Khởi nghiệp', 'Làm việc', 'Sống'],
    correct: 1,
  },
  {
    q: 'Phong trào nổi bật của tổ chức Đoàn trong thời kỳ kháng chiến chống Mỹ?',
    choices: ['Năm xung phong', 'Ba sẵn sàng', 'Ba đảm đang', 'Bình dân học vụ'],
    correct: 1,
  },
  {
    q: 'Cuộc vận động "Thanh niên tình nguyện" được phát động lần đầu vào năm nào?',
    choices: ['1998', '2000', '2003', '2005'],
    correct: 1,
  },
  {
    q: 'Độ tuổi quy định kết nạp Đoàn viên là từ bao nhiêu tuổi?',
    choices: ['14 tuổi', '15 tuổi', '16 tuổi', '18 tuổi'],
    correct: 2,
  },
  {
    q: 'Tinh thần "5 xung kích" bao gồm: Xung kích trong nâng cao nhận thức _____?',
    choices: ['Số', 'Pháp luật', 'Chính trị', 'Văn hóa'],
    correct: 0,
  },
  {
    q: '"6 khát vọng" của thanh niên bao gồm khát vọng về: Độc lập dân tộc, Dân giàu, Nước mạnh, Dân chủ, Công bằng và _____?',
    choices: ['Tự do', 'Hạnh phúc', 'Văn minh', 'Hòa bình'],
    correct: 2,
  },
  {
    q: 'Nữ anh hùng lực lượng vũ trang nhân dân trẻ tuổi nhất của dân tộc Việt Nam là ai?',
    choices: ['Nguyễn Thị Minh Khai', 'Võ Thị Sáu', 'Nguyễn Thị Chiên', 'Mạc Thị Bưởi'],
    correct: 1,
  },
  {
    q: 'Câu nói "Không có gì quý hơn độc lập, tự do" là của ai?',
    choices: ['Hồ Chí Minh', 'Võ Nguyên Giáp', 'Phạm Văn Đồng', 'Trường Chinh'],
    correct: 0,
  },
  {
    q: 'Chương trình "Mùa hè xanh" do tổ chức nào phát động hàng năm?',
    choices: ['Hội Sinh viên', 'Hội Chữ thập đỏ', 'Đoàn Thanh niên', 'Bộ Giáo dục'],
    correct: 3,
  },
  {
    q: 'Ngày Quốc tế Thanh niên được Liên hợp quốc chọn là ngày nào?',
    choices: ['15 tháng 10', '12 tháng 8', '1 tháng 6', '26 tháng 3'],
    correct: 3,
  },
  {
    q: 'Ngày truyền thống của Hội Liên hiệp Thanh niên Việt Nam là ngày nào?',
    choices: ['26 tháng 3', '15 tháng 10', '2 tháng 9', '20 tháng 11'],
    correct: 1,
  },
  {
    q: 'Chương trình truyền hình dành cho học sinh THPT phát sóng sáng Chủ nhật trên VTV3?',
    choices: ['Ai là triệu phú', 'Đường lên đỉnh Olympia', 'Rung chuông vàng', 'Chiếc nón kỳ diệu'],
    correct: 1,
  },
  {
    q: 'Phong trào "Tuổi trẻ sáng tạo" do tổ chức nào phát động?',
    choices: ['Hội Sinh viên', 'Đoàn Thanh niên', 'Hội Phụ nữ', 'Công đoàn'],
    correct: 1,
  },
  {
    q: 'Hình ảnh vị anh hùng trẻ tuổi hô to "Nhằm thẳng quân thù mà bắn" là ai?',
    choices: ['Phan Đình Giót', 'Nguyễn Viết Xuân', 'Tô Vĩnh Diện', 'Bế Văn Đàn'],
    correct: 3,
  },
  {
    q: 'Một trong "5 chủ động" là Chủ động trong khởi nghiệp, đổi mới _____?',
    choices: ['Công nghệ', 'Sáng tạo', 'Tư duy', 'Phương pháp'],
    correct: 1,
  },
  {
    q: 'Một trong "5 chủ động" là Chủ động trong quản trị thông minh và tối ưu hóa hiệu quả _____?',
    choices: ['Sản xuất', 'Công việc', 'Tài chính', 'Môi trường'],
    correct: 1,
  },
  {
    q: 'Màu áo truyền thống của Đoàn Thanh niên là màu gì?',
    choices: ['Xanh', 'Đỏ', 'Trắng', 'Vàng'],
    correct: 0,
  },
  {
    q: 'Thanh niên Việt Nam được chia thành mấy nhóm đối tượng theo Luật Thanh niên 2020?',
    choices: ['3 nhóm', '4 nhóm', '5 nhóm', '6 nhóm'],
    correct: 2,
  },
  {
    q: 'Giải thưởng nào được trao cho các công trình sáng tạo trẻ tiêu biểu do Trung ương Đoàn trao tặng?',
    choices: ['Cánh Diều Vàng', 'Quả Cầu Vàng', 'Sao Khuê', 'Nhân tài Đất Việt'],
    correct: 3,
  },
  {
    q: 'Điền từ còn thiếu: "Thanh niên là người chủ _____ của nước nhà" (Bác Hồ).',
    choices: ['Tương lai', 'Hiện tại', 'Quá khứ', 'Vận mệnh'],
    correct: 0,
  },
  {
    q: 'Lá cờ Đoàn có hình huy hiệu Đoàn ở chính giữa trên nền cờ màu gì?',
    choices: ['Trắng', 'Xanh', 'Đỏ', 'Vàng'],
    correct: 3,
  },
  {
    q: 'Đại hội Đoàn toàn quốc lần thứ mấy diễn ra vào năm 2022?',
    choices: ['Lần thứ 10', 'Lần thứ 11', 'Lần thứ 12', 'Lần thứ 13'],
    correct: 2,
  },
  {
    q: 'Theo Luật Thanh niên 2020, thanh niên là công dân Việt Nam từ đủ _____ tuổi đến _____ tuổi?',
    choices: ['15 đến 25', '16 đến 30', '18 đến 30', '16 đến 35'],
    correct: 2,
  },
  {
    q: 'Hiệp hội các quốc gia Đông Nam Á (ASEAN) được thành lập vào năm nào?',
    choices: ['1945', '1955', '1967', '1975'],
    correct: 2,
  },
  {
    q: 'Chủ tịch Hồ Chí Minh viết thư gửi thanh niên nhân dịp Tết Nguyên đán đầu tiên của nước Việt Nam Dân chủ Cộng hòa vào năm nào?',
    choices: ['1948', '1945', '1946', '1947'],
    correct: 3,
  },
  {
    q: 'Xung kích xây dựng, hoàn thiện _____ số là 1 trong 5 xung kích?',
    choices: ['Pháp luật', 'Thể chế', 'Chính sách', 'Quy trình'],
    correct: 1,
  },
  {
    q: 'Một trong "5 xung kích" trong chuyển đổi số quốc gia là Xung kích phát triển _____ số?',
    choices: ['Hạ tầng', 'Kinh tế', 'Văn hóa', 'Giáo dục'],
    correct: 0,
  },
  {
    q: 'Bí thư thứ nhất Trung ương Đoàn hiện nay (2024) là ai?',
    choices: ['Nguyễn Đắc Vinh', 'Nguyễn Anh Tuấn', 'Bùi Quang Huy', 'Lê Quốc Phong'],
    correct: 3,
  },
  {
    q: 'Tháng mấy hàng năm được chọn là Tháng Thanh niên?',
    choices: ['Tháng 3', 'Tháng 1', 'Tháng 5', 'Tháng 10'],
    correct: 0,
  },
  {
    q: 'Thành viên của tổ chức Đoàn TNCS Hồ Chí Minh được gọi là gì?',
    choices: ['Đoàn viên', 'Đảng viên', 'Hội viên', 'Đội viên'],
    correct: 0,
  },
  {
    q: 'Một trong "5 xung kích" là: Xung kích đào tạo nguồn nhân lực _____?',
    choices: ['Số', 'Xanh', 'Trẻ', 'Mới'],
    correct: 0,
  },

];

const LABELS = ['A', 'B', 'C', 'D'];

function App() {
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [revealedCells, setRevealedCells] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [guessingRow, setGuessingRow] = useState(false);
  const [rowInputValue, setRowInputValue] = useState('');
  const [expandedRow, setExpandedRow] = useState(null); // which row's dropdown is open

  const [currentTeam, setCurrentTeam] = useState(0); // not numbered, just generic
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const normalizeString = (str) => str.replace(/\s+/g, '').toUpperCase();

  const nextQuestion = () => {
    if (currentQIdx + 1 >= QUESTION_POOL.length) {
      setGameOver(true);
      setFeedback('ĐÃ HẾT CÂU HỎI! GAME KẾT THÚC.');
      return;
    }
    setCurrentQIdx(prev => prev + 1);
    setFeedback('');
    setSelectedChoice(null);
    setAnswered(false);
    setWrongCount(0);
    setCurrentTeam(prev => prev + 1); // just increment, we don't display a number
  };

  const handleChoiceClick = (choiceIdx) => {
    if (answered || gameOver) return;

    setSelectedChoice(choiceIdx);
    setAnswered(true);

    const currentQ = QUESTION_POOL[currentQIdx];
    if (choiceIdx === currentQ.correct) {
      // Correct!
      setTokens(prev => prev + 1);
      setFeedback('CHÍNH XÁC! ĐƯỢC 1 LƯỢT MỞ Ô.');
      setTimeout(() => {
        nextQuestion();
      }, 2500);
    } else {
      // Wrong
      if (wrongCount === 0) {
        // First wrong: pass to next team
        setFeedback('SAI RỒI! Chuyển sang nhóm tiếp theo.');
        setWrongCount(1);
        setCurrentTeam(prev => prev + 1);
        setTimeout(() => {
          setSelectedChoice(null);
          setAnswered(false);
          setFeedback('Nhóm tiếp theo, xin mời trả lời!');
        }, 2000);
      } else {
        // Second wrong: skip question
        setFeedback(`SAI RỒI! Bỏ qua câu hỏi này. Đáp án đúng: ${currentQ.choices[currentQ.correct]}`);
        setTimeout(() => {
          nextQuestion();
        }, 3000);
      }
    }
  };

  const handleCircleClick = (rowId, colIdx) => {
    if (tokens <= 0 || gameOver) return;
    const key = `${rowId}-${colIdx}`;
    if (revealedCells[key]) return;
    setRevealedCells(prev => ({ ...prev, [key]: true }));
    setTokens(prev => prev - 1);
    setFeedback(`Đã mở 1 ô! Còn ${tokens - 1} lượt mở ô.`);
  };

  const handleRowGuess = (e) => {
    e.preventDefault();
    if (!rowInputValue.trim() || !selectedRow) return;
    const row = ROWS.find(r => r.id === selectedRow);
    if (normalizeString(rowInputValue) === normalizeString(row.answer)) {
      const newRevealed = { ...revealedCells };
      for (let i = 0; i < row.length; i++) {
        newRevealed[`${row.id}-${i}`] = true;
      }
      setRevealedCells(newRevealed);
      setTokens(prev => prev + 1);
      setFeedback(`CHÍNH XÁC hàng ngang số ${selectedRow}! +1 lượt mở ô.`);
      setTimeout(() => {
        setSelectedRow(null);
        setGuessingRow(false);
        setRowInputValue('');
        setFeedback('');
      }, 2500);
    } else {
      setFeedback('SAI RỒI! Đáp án hàng ngang chưa đúng.');
    }
  };

  const isRowRevealed = (rowId) => {
    const row = ROWS.find(r => r.id === rowId);
    if (!row) return false;
    return row.chars.every((_, i) => revealedCells[`${rowId}-${i}`]);
  };

  const currentQ = currentQIdx < QUESTION_POOL.length ? QUESTION_POOL[currentQIdx] : null;

  return (
    <div className="game-container">
      <header className="game-header">
        <div className="logo-area">
          <div className="program-name">ĐƯỜNG LÊN ĐỈNH OLYMPIA</div>
        </div>
        <div className="top-right">
          <div className="chip">Chủ đề Thanh niên</div>
          <div className="chip token-chip">Lượt mở ô: {tokens}</div>
        </div>
      </header>

      <main className="game-main">
        {/* Left: Picture Puzzle */}
        <div className="left-panel">
          <div className="image-container">
            <img
              src="/vietnam_youth_future.png"
              alt="Hidden"
              className="hidden-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop";
              }}
            />
            {!isRowRevealed(1) && <div className="puzzle-piece piece-1">1</div>}
            {!isRowRevealed(2) && <div className="puzzle-piece piece-2">2</div>}
            {!isRowRevealed(3) && <div className="puzzle-piece piece-3">3</div>}
            {!isRowRevealed(4) && <div className="puzzle-piece piece-4">4</div>}
          </div>
        </div>

        {/* Right: Rows */}
        <div className="right-panel">
          <div className="obstacle-header-container">
            <div className="obstacle-header">
              VƯỢT CHƯỚNG NGẠI VẬT
            </div>
          </div>
          <div className="rows-area">
            {ROWS.map((row) => (
              <div key={row.id}>
                <div
                  className={`row-container ${selectedRow === row.id ? 'selected' : ''}`}
                  onClick={() => {
                    if (isRowRevealed(row.id) && ROW_DETAILS[row.id]) {
                      // Toggle dropdown
                      setExpandedRow(expandedRow === row.id ? null : row.id);
                      return;
                    }
                    if (guessingRow && selectedRow === row.id) return;
                    setSelectedRow(row.id === selectedRow ? null : row.id);
                    setGuessingRow(false);
                    setRowInputValue('');
                  }}
                >
                  <div className="circles-container">
                    {Array.from({ length: row.length }).map((_, i) => (
                      <div
                        key={i}
                        className={`circle ${revealedCells[`${row.id}-${i}`] ? 'revealed' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCircleClick(row.id, i);
                        }}
                        style={{ cursor: tokens > 0 && !revealedCells[`${row.id}-${i}`] ? 'pointer' : 'default' }}
                      >
                        {revealedCells[`${row.id}-${i}`] ? row.chars[i] : ''}
                      </div>
                    ))}
                  </div>
                  <div className="row-number">
                    {isRowRevealed(row.id) && ROW_DETAILS[row.id] ? (expandedRow === row.id ? '▲' : '▼') : row.id}
                  </div>
                </div>

                {/* Expandable dropdown for rows with details */}
                {expandedRow === row.id && ROW_DETAILS[row.id] && (
                  <div className="row-dropdown">
                    <div className="dropdown-title">{ROW_DETAILS[row.id].title}</div>
                    <ol className="dropdown-list">
                      {ROW_DETAILS[row.id].items.map((item, idx) => (
                        <li key={idx}>
                          <strong>{item.bold}</strong> {item.text}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}

            {/* Row guess controls */}
            {selectedRow && !guessingRow && (
              <button
                className="guess-row-btn"
                onClick={() => setGuessingRow(true)}
              >
                TRẢ LỜI HÀNG NGANG SỐ {selectedRow}
              </button>
            )}
            {guessingRow && selectedRow && (
              <form onSubmit={handleRowGuess} className="row-guess-form">
                <input
                  type="text"
                  value={rowInputValue}
                  onChange={(e) => setRowInputValue(e.target.value)}
                  placeholder={`Nhập đáp án hàng ${selectedRow}...`}
                  autoFocus
                />
                <button type="submit">GỬI</button>
                <button type="button" onClick={() => { setGuessingRow(false); setRowInputValue(''); setFeedback(''); }}>HỦY</button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom: Question Box with ABCD */}
        <div className="question-box">
          {currentQ && !gameOver ? (
            <>
              <div className="q-header">
                CÂU HỎI {currentQIdx + 1}
              </div>
              <div className="q-text">{currentQ.q}</div>
              <div className="choices-grid">
                {currentQ.choices.map((choice, idx) => {
                  let cls = 'choice-btn';
                  if (answered) {
                    if (idx === currentQ.correct) cls += ' correct';
                    else if (idx === selectedChoice) cls += ' wrong';
                  }
                  return (
                    <button
                      key={idx}
                      className={cls}
                      onClick={() => handleChoiceClick(idx)}
                      disabled={answered}
                    >
                      <span className="choice-label">{LABELS[idx]}</span>
                      <span className="choice-text">{choice}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="q-text" style={{ fontSize: '2rem' }}>
              {gameOver ? 'ĐÃ HẾT CÂU HỎI! GAME KẾT THÚC.' : 'Đang tải câu hỏi...'}
            </div>
          )}
        </div>
      </main>

      {/* Feedback bar */}
      {feedback && (
        <div className="feedback-bar">
          {feedback}
        </div>
      )}
    </div>
  );
}

export default App;
