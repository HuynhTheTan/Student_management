$(document).ready(function () {
  // table
  $(".showBtn").click(function () {
    var row = $(this).closest("tr");
    var id = row.find("td:eq(0)").text();
    var name = row.find("td:eq(1)").text();
    var group = row.find("td:eq(2)").text();
    $("#customAlert").remove();
    var alertBox = `
      <div id="customAlert">
        <div class="alert-content">
          <h1>Information</h1>
          <p><b>ID:</b> ${id}</p>
          <p><b>Name:</b> ${name}</p>
          <p><b>Group:</b> ${group}</p>
          <button id="okBtn">OK</button>
        </div>
      </div>
    `;
    $("body").append(alertBox);
    $("#okBtn").click(function () {
      $("#customAlert").fadeOut(100, function () {
        $(this).remove();
      });
    });
  });
  // form1
  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      let re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },
    "Invalid format"
  );

  $("#form1").validate({
    errorClass: "error",

    highlight: function (element) {
      $(element).closest(".form-group").addClass("has-error");
    },
    unhighlight: function (element) {
      $(element).closest(".form-group").removeClass("has-error");
    },

    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },

    rules: {
      firstName: {
        required: true,
        maxlength: 25,
      },
      lastName: {
        required: true,
        maxlength: 25,
      },
      yearOld: {
        required: true,
        min: 15,
        max: 150,
      },
      startDate: {
        required: true,
        date: true,
      },
      phoneNumber: {
        required: true,
        regex: /^[+0-9]+$/,
      },
    },

    messages: {
      firstName: {
        required: "Vui lòng nhập tên",
        maxlength: "Độ dài tối đa là 25",
      },
      lastName: {
        required: "Vui lòng nhập họ",
        maxlength: "Độ dài tối đa là 25",
      },
      yearOld: {
        required: "Vui lòng nhập tuổi",
        min: "Tối thiểu là 15",
        max: "Tối đa là 150",
      },
      startDate: {
        required: "Vui lòng chọn ngày sinh",
        date: "nhập một ngày hợp lệ",
      },
      phoneNumber: {
        required: "Vui lòng nhập số điện thoại",
        regex: "Chỉ bao gồm dấu + và các số ",
      },
    },

    submitHandler: function (form, event) {
      event.preventDefault();
      alert("Gửi form thành công");
      form.reset();
      $(".form-group").removeClass("has-error");
    },
  });
  // form2
  function updateFullName() {
    var firstName = $("#firstName1").val() || "";
    var lastName = $("#lastName1").val() || "";
    $("#fullName").text(lastName + " " + firstName);
  }
  function updateSex() {
    var sexText =
      $("input[name='sexRadio']:checked").next("label").text() || "";
    $("#sex").text(sexText);
  }
  function updateNationality() {
    var nationality = $("#nationality1 option:selected").val() || "";
    $("#nationality").text(nationality);
  }
  $("#firstName1, #lastName1").on("input", updateFullName);
  $("input[name='sexRadio']").on("change", updateSex);
  $("#nationality1").on("change", updateNationality);
});
