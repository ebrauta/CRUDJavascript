let dados = [] 

const ApagaRegistro = (id) => {
  let _confirm = confirm("Deseja realmente excluir este registro?");
  if (_confirm) {
    dados = dados.filter((dado) => dado.ID !== id);
    PopulaTabela();
    localStorage.setdado("__dados__", JSON.stringify(dados));
  }
};

const EditaRegistro = (id) => {
  $("#modalRegistro").modal("show");
  let dado = dados.find((element) => element.ID === id);
  if (dado) {
    let [dia, mes, ano] = dado.DtNascimento.split("/");
    $("#hiddenID").val(dado.ID);
    $("#txtNome").val(dado.Nome);
    $("#txtSobrenome").val(dado.Sobrenome);
    $("#txtDtNascimento").val(`${ano}-${mes}-${dia}`);
    $("#txtFormacao").val(dado.Formacao);
  }
};

const PopulaTabela = () => {
  if (Array.isArray(dados)) {
    localStorage.setItem("__dados__", JSON.stringify(dados));
    $("#tblDados tbody").html("");
    dados.forEach((dado) => {
      $("#tblDados tbody").append(`<tr>
            <th>${dado.ID}</th>
            <td>${dado.Nome}</td>
            <td>${dado.Sobrenome}</td>
            <td>${dado.DtNascimento}</td>
            <td>${dado.Formacao}</td>
            <td><button type="button" class="btn btn-success" onclick="javascript:EditaRegistro(${dado.ID})"><i class="fa fa-edit" /></button></td>
            <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${dado.ID})"><i class="fa fa-trash" /></button></td>
            </tr>`);
    });
  }
};

$(() => {
  dados = JSON.parse(localStorage.getItem("__dados__"));
  if (dados) {
    PopulaTabela();
  }

  $("#btnSalvar").click(() => {
    let Id = $("#hiddenID").val();
    let Nome = $("#txtNome").val();
    let Sobrenome = $("#txtSobrenome").val();
    let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString(
      "pt-br",
      { timeZone: "UTC" }
    );
    let Formacao = $("#txtFormacao").val();

    if (!Id || Id === "0") {
      let registro = {
        ID: dados.length + 1,
        Nome: Nome,
        Sobrenome: Sobrenome,
        DtNascimento: DtNascimento,
        Formacao: Formacao,
      };
      dados.push(registro);
      alert("Registro salvo com sucesso!");
    } else {
      let dado = dados.find((element) => element.ID == Id);
      if (dado) {
        dado.Nome = Nome;
        dado.Sobrenome = Sobrenome;
        dado.DtNascimento = DtNascimento;
        dado.Formacao = Formacao;
      }
      alert("Registro alterado com sucesso!");
    }
    LimpaModal();
    PopulaTabela();
  });
});

const LimpaModal = () => {
  $("#modalRegistro").modal("hide");

  $("#hiddenID").val("");
  $("#txtNome").val("");
  $("#txtSobrenome").val("");
  $("#txtDtNascimento").val("");
  $("#txtFormacao").val("");
};
