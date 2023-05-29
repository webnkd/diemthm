let scriptURL =
'https://script.google.com/macros/s/AKfycbx_2wQ3IIWGhXmS-RDhTDoE0cxisT_ElgUbN_Vr52My4PYm6B-2bYsjyNabJHqpzSAmBw/exec'

 let form = document.forms['form_tt'];

// document.querySelector("#form_tt").onsubmit = function (e) { //lệnh này hoặc lệnh form.addEventListener('submit', (e) =>
  form.addEventListener('submit', (e) => {
  e.preventDefault();

  //Submit Form website to Google Sheet
  let data = new FormData(form);
  fetch(scriptURL, { method: 'POST', body: data })
  // .then((response) => alert("Thank you! your form is submitted successfully."))
    .then(() => {window.location.reload();})
  .catch((error) => console.error("Error!", error.message));

  //Truy cập các phần tử HTML
  let hotenOj = document.querySelector('input[name="hoten"]');
  let sdtOj = document.querySelector('input[name="sdt"]');
  let kvOj = document.querySelector('select[name="kv"]');
  let dtOj = document.querySelector('select[name="dt"]');
  let toanOj = document.querySelector('input[name="toan"]');
  let liOj = document.querySelector('input[name="li"]');
  let hoaOj = document.querySelector('input[name="hoa"]');
  let sinhOj = document.querySelector('input[name="sinh"]');
  let vanOj = document.querySelector('input[name="van"]');
  let suOj = document.querySelector('input[name="su"]');
  let diaOj = document.querySelector('input[name="dia"]');
  let anhOj = document.querySelector('input[name="anh"]');
  let gdcdOj = document.querySelector('input[name="gdcd"]');

  //Lấy giá trị người dùng nhập vào
  let hoten = hotenOj.value;
  let sdt = sdtOj.value;
  let toan = parseFloat(toanOj.value);
  let li = parseFloat(liOj.value);
  let hoa = parseFloat(hoaOj.value);
  let sinh = parseFloat(sinhOj.value);
  let van = parseFloat(vanOj.value);
  let su = parseFloat(suOj.value);
  let dia = parseFloat(diaOj.value);
  let anh = parseFloat(anhOj.value);
  let gdcd = parseFloat(gdcdOj.value);

  let kv = kvOj.value;
  let dkv = 0;
  switch (kv) {
    case "1": {
      dkv = 0.75;
      break;
    }
    case "2NT": {
      dkv = 0.5;
      break;
    }
    case "2": {
      dkv = 0.25;
      break;
    }
    case "3": {
      dkv = 0;
      break;
    }
    default: {
      dkv = 0;
      break;
    }
  }

  let dt = dtOj.value;
  let ddt = 0;
  switch (dt) {
    case "00": {
      ddt = 0;
      break;
    }
    case "01":
    case "02":
    case "03":
    case "04": {
      ddt = 2;
      break;
    }
    case "05":
    case "06":
    case "07": {
      ddt = 1;
      break;
    }
    default: {
      ddt = 0;
      break;
    }
  }

  // Tính điểm THM
  let khtn = Math.round(((li + hoa + sinh) / 3) * 100) / 100;
  let khxh = Math.round(((su + dia + gdcd) / 3) * 100) / 100;
  let A00 = Math.round((toan + li + hoa) * 100) / 100;
  let A01 = Math.round((toan + li + anh) * 100) / 100;
  let B00 = Math.round((toan + hoa + sinh) * 100) / 100;
  let C00 = Math.round((van + su + dia) * 100) / 100;
  let C01 = Math.round((toan + van + li) * 100) / 100;
  let C02 = Math.round((toan + van + hoa) * 100) / 100;
  let C08 = Math.round((van + hoa + sinh) * 100) / 100;
  let D01 = Math.round((toan + van + anh) * 100) / 100;
  let D07 = Math.round((toan + anh + hoa) * 100) / 100;
  let D14 = Math.round((van + anh + su) * 100) / 100;
  let D15 = Math.round((van + anh + dia) * 100) / 100;
  let D90 = Math.round((toan + anh + khtn) * 100) / 100;
  let D96 = Math.round((toan + anh + khxh) * 100) / 100;

  // Gán điểm THM
  document.getElementById("A001").innerText = A00;
  document.getElementById("A011").innerText = A01;
  document.getElementById("B001").innerText = B00;
  document.getElementById("C001").innerText = C00;
  document.getElementById("C011").innerText = C01;
  document.getElementById("C021").innerText = C02;
  document.getElementById("C081").innerText = C08;
  document.getElementById("D011").innerText = D01;
  document.getElementById("D071").innerText = D07;
  document.getElementById("D141").innerText = D14;
  document.getElementById("D151").innerText = D15;
  document.getElementById("D901").innerText = D90;
  document.getElementById("D961").innerText = D96;
  let A002 = A00;
  let A012 = A01;
  let B002 = B00;
  let C002 = C00;
  let C012 = C01;
  let C022 = C02;
  let C082 = C08;
  let D012 = D01;
  let D072 = D07;
  let D142 = D14;
  let D152 = D15;
  let D902 = D90;
  let D962 = D96;

  if(A00<22.5){
    A002 = Math.round((A00 + dkv + ddt)*100)/100;
    document.getElementById("A002").innerText = A002;
  }else{
    A002 = Math.round((A00 + ((30 - A00) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("A002").innerText = A002;
  }
  
  if(A01<22.5){
    A012 = Math.round((A01 + dkv + ddt)*100)/100;
    document.getElementById("A012").innerText = A002;
  }else{
    A012 = Math.round((A01 + ((30 - A01) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("A012").innerText = A012;
  }

  if(B00<22.5){
    B002 = Math.round((B00 + dkv + ddt)*100)/100;
    document.getElementById("B002").innerText = B002;
  }else{
    B002 = Math.round((B00 + ((30 - B00) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("B002").innerText = B002;
  }

  if(C00<22.5){
    C002 = Math.round((C00 + dkv + ddt)*100)/100;
    document.getElementById("C002").innerText = C002;
  }else{
    C002 = Math.round((C00 + ((30 - C00) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("C002").innerText = C002;
  }
 
  if(C01<22.5){
    C012 = Math.round((C01 + dkv + ddt)*100)/100;
    document.getElementById("C012").innerText = C012;
  }else{
    C012 = Math.round((C01 + ((30 - C01) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("C012").innerText = C012;
  }

  if(C02<22.5){
    C022 = Math.round((C02 + dkv + ddt)*100)/100;
    document.getElementById("C022").innerText = C022;
  }else{
    C022 = Math.round((C02 + ((30 - C02) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("C022").innerText = C022;
  }

  if(C08<22.5){
    C082 = Math.round((C08 + dkv + ddt)*100)/100;
    document.getElementById("C082").innerText = C082;
  }else{
    C082 = Math.round((C08 + ((30 - C08) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("C082").innerText = C082;
  }
  
  if(D01<22.5){
    D012 = Math.round((D01 + dkv + ddt)*100)/100;
    document.getElementById("D012").innerText = D012;
  }else{
    D012 = Math.round((D01 + ((30 - D01) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("D012").innerText = D012;
  }

  if(D07<22.5){
    D072 = Math.round((D07 + dkv + ddt)*100)/100;
    document.getElementById("D072").innerText = D072;
  }else{
    D072 = Math.round((D07 + ((30 - D07) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("D072").innerText = D072;
  }

  if(D14<22.5){
    D142 = Math.round((D14 + dkv + ddt)*100)/100;
    document.getElementById("D142").innerText = D142;
  }else{
    D142 = Math.round((D14 + ((30 - D14) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("D142").innerText = D142;
  }

  if(D15<22.5){
    D152 = Math.round((D15 + dkv + ddt)*100)/100;
    document.getElementById("D152").innerText = D152;
  }else{
    D152 = Math.round((D15 + ((30 - D15) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("D152").innerText = D152;
  }

  if(D90<22.5){
    D902 = Math.round((D90 + dkv + ddt)*100)/100;
    document.getElementById("D902").innerText = D902;
  }else{
    D902 = Math.round((D90 + ((30 - D90) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("D902").innerText = D902;
  }

  if(D96<22.5){
    D962 = Math.round((D96 + dkv + ddt)*100)/100;
    document.getElementById("D962").innerText = D962;
  }else{
    D962 = Math.round((D96 + ((30 - D96) / 7.5) * (dkv + ddt)) * 100) / 100;
    document.getElementById("D962").innerText = D962;
  }

});



// const scriptURL =
//   "https://script.google.com/macros/s/AKfycbwAugoMqQkV80tvfK0TaWo9-L6JHQNQGiUgG3TcW7wzU69dTvb2JrNOU5nvr3_8H-jtGQ/exec";
// const form = document.forms["form_tt"];

    
//  form.addEventListener("submit", (e) => {
//   e.preventDefault();
// fetch(scriptURL, { method: "GET", body: new FormData(form) })
//     .then((response) =>
//       alert("Thank you! your form is submitted successfully.")
//     )
//     .then(() => {
//       window.location.reload();
//     })
//     .catch((error) => console.error("Error!", error.message));
// });



function checkNumber() {
  var dtoan = document.getElementById("toan").value;
  if (isNaN(dtoan)) {
    document.getElementById("toan").style.backgroundColor = "red";
    document.getElementById("toan").focus();
  } else {
    document.getElementById("toan").style.backgroundColor = "white";
    document.getElementById("toan").style.color = "blue";
  }

  var dli = document.getElementById("li").value;
  if (isNaN(dli)) {
    document.getElementById("li").style.backgroundColor = "red";
    document.getElementById("li").focus();
  } else {
    document.getElementById("li").style.backgroundColor = "white";
    document.getElementById("li").style.color = "blue";
    // var dli = document.getElementById("li").value;
  }

  var dhoa = document.getElementById("hoa").value;
  if (isNaN(dhoa)) {
    document.getElementById("hoa").style.backgroundColor = "red";
    document.getElementById("hoa").focus();
  } else {
    document.getElementById("hoa").style.backgroundColor = "white";
    document.getElementById("hoa").style.color = "blue";
    var dhoa = document.getElementById("hoa").value;
  }

  var dsinh = document.getElementById("sinh").value;
  if (isNaN(dsinh)) {
    document.getElementById("sinh").style.backgroundColor = "red";
    document.getElementById("sinh").focus();
  } else {
    document.getElementById("sinh").style.backgroundColor = "white";
    document.getElementById("sinh").style.color = "blue";
    var dsinh = document.getElementById("sinh").value;
  }

  var dvan = document.getElementById("van").value;
  if (isNaN(dvan)) {
    document.getElementById("van").style.backgroundColor = "red";
    document.getElementById("van").focus();
  } else {
    document.getElementById("van").style.backgroundColor = "white";
    document.getElementById("van").style.color = "blue";
  }

  var dsu = document.getElementById("su").value;
  if (isNaN(dsu)) {
    document.getElementById("su").style.backgroundColor = "red";
    document.getElementById("su").focus();
  } else {
    document.getElementById("su").style.backgroundColor = "white";
    document.getElementById("su").style.color = "blue";
  }

  var ddia = document.getElementById("dia").value;
  if (isNaN(ddia)) {
    document.getElementById("dia").style.backgroundColor = "red";
    document.getElementById("dia").focus();
  } else {
    document.getElementById("dia").style.backgroundColor = "white";
    document.getElementById("dia").style.color = "blue";
  }

  var danh = document.getElementById("anh").value;
  if (isNaN(danh)) {
    document.getElementById("anh").style.backgroundColor = "red";
    document.getElementById("anh").focus();
  } else {
    document.getElementById("anh").style.backgroundColor = "white";
    document.getElementById("anh").style.color = "blue";
  }

  var dgdcd = document.getElementById("gdcd").value;
  if (isNaN(dgdcd)) {
    document.getElementById("gdcd").style.backgroundColor = "red";
    document.getElementById("gdcd").focus();
  } else {
    document.getElementById("gdcd").style.backgroundColor = "white";
    document.getElementById("gdcd").style.color = "blue";
  }
}

function kvFunction() {
  var dkv = 0;
  var kv = document.getElementById("kv").value;
  switch (kv) {
    case "1": {
      dkv = 0.75;
      break;
    }
    case "2NT": {
      dkv = 0.5;
      break;
    }
    case "2": {
      dkv = 0.25;
      break;
    }
    case "3": {
      dkv = 0;
      break;
    }
    default: {
      dkv = 0;
      break;
    }
  }
  // document.getElementById("kv_chon").innerText=dkv;
}
function dtFunction() {
  var ddt = 0;
  var doituong = document.getElementById("dt").value;
  switch (doituong) {
    case "00": {
      ddt = 0;
      break;
    }
    case "01":
    case "02":
    case "03":
    case "04": {
      ddt = 2;
      break;
    }
    case "05":
    case "06":
    case "07": {
      ddt = 1;
      break;
    }
    default: {
      ddt = 0;
      break;
    }
  }
  // document.getElementById("dt_chon").innerText=ddt;
}
