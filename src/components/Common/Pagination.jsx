import "./Pagination.css";

//전체 아이템 개수, 한 페이지 표시 아이템 수, 클릭 함수, 현재 페이지
const Pagination = ({ total, perPage, onClick, currentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pages.push(i); //페이지 수 만큼 배열에 숫자 입력
  }
  //현재 페이지가 없을 경우 1 페이지
  currentPage = currentPage ? currentPage : 1;

  return (
    <>
      {pages.length > 1 && (
        <ul className="pagination">
          {pages.map((page) => (
            <li key={page}>
              <button
                className={
                  parseInt(currentPage) === page
                    ? "pagination_button active"
                    : "pagination_button"
                }
                onClick={() => onClick(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Pagination;
