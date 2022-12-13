$(document).ready(function () {
  $("#btn").click(function () {
    const piece = $("#draggable_wrapper > div");
    const gallery = $("#gallery_wrapper > div");

    randomPosition();
    showContainer();

    function showContainer() {
      $("article").css({ display: "flex" });
      $("#btn").text("Reset");
    }

    function randomPosition() {
      piece.each(function () {
        let pieceLeft = Math.random() * 500;
        let pieceTop = Math.random() * 600;

        $(this).css({ left: pieceLeft, top: pieceTop });
      });
    }

    piece.draggable({
      stop: onStop,
    });

    function onStop() {
      console.log("stop");
    }

    function onStop() {
      let dragPiece = $(this);
      let indexDiv = dragPiece.index(); //몇 번째 div인지 찾기
      let offsetLeft = dragPiece.offset().left; //피스의 left 좌표
      let offsetTop = dragPiece.offset().top; //피스의 top 좌표

      let galleryPiece = gallery.eq(indexDiv); //gallery에서 div(indexDiv)의 index값을 반환, gallery_wrapper -> div
      let galleryWidth = galleryPiece.width(); //gallery에 들어간 피스의 넓이
      let galleryHeight = galleryPiece.height(); //gallery에 들어간 피스의 높이
      let pieceLeft = galleryPiece.offset().left; //gallery에 들어간 피스의 left 좌표
      let pieceTop = galleryPiece.offset().top; //gallery에 들어간 피스의 top 좌표

      let minLeft = pieceLeft - galleryWidth;
      let minTop = pieceTop - galleryHeight;
      let maxLeft = pieceLeft + galleryWidth;
      let maxTop = pieceTop + galleryHeight;

      let count = 0;
      const totalSize = gallery.size(); //gallery 피스의 전체 개수(length)

      if (
        offsetLeft > minLeft &&
        offsetLeft < maxLeft &&
        offsetTop > minTop &&
        offsetTop < maxTop
      ) {
        dragPiece.draggable("destroy"); //jQeury UI의 interaction 기능. dragPiece(div)를 드래그하지 못하게 함.
        dragPiece.animate({ left: pieceLeft, top: pieceTop }, 300);
      }
    }
  });
});

// invisible on the mobile.
$(window).resize(function () {
  const widthSize = window.outerWidth;
  if (widthSize <= 1024) {
    alert("이 페이지는 PC에 최적화 되어 있습니다. PC에서 접속해주세요.");
  }
});
