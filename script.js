/*
  This file part of https://github.com/wildyrando/IPK-Kalkulator.git
*/

window.kode = `
<tr>
    <td><input type="text" class="matkul w-full bg-white rounded-md border border-gray-300 px-4 py-2"></td>
    <td><input type="number" class="sks input-small w-full bg-white rounded-md border border-gray-300 px-4 py-2" value="0"></td>
    <td><input type="number" class="tugas input-small w-full bg-white rounded-md border border-gray-300 px-4 py-2" value="0"></td>
    <td><input type="number" class="uts input-small w-full bg-white rounded-md border border-gray-300 px-4 py-2" value="0"></td>
    <td><input type="number" class="uas input-small w-full bg-white rounded-md border border-gray-300 px-4 py-2" value="0"></td>
    <td><select class="jenis bg-white rounded-md border border-gray-300 px-2 py-1">
        <option value="def1">TM (30%), UTS (30%), UAS (40%)</option>
        <option value="def2">TM (50%), UTS (20%), UAS (30%)</option>
    </select></td>
    <td class="grade px-4 py-2 center"></td>
    <td class="final px-4 py-2 center"</td>
    <td><button class="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded tombolhapus">Hapus</button></td>
</tr>
`;

function tambahkan() {
    $('table#nilai tbody').append(kode);
}

function hitungipk() {
    var total_matkul = $('table#nilai tbody tr').length;
    var total_sks = 0;
    var total_nilai = 0;
    var nama = $('#nama').val();
    var nim = $('#nim').val();

    if (nama.trim().length == 0 || nim.trim().length == 0) {
        alert('Isi dulu Nama sama NIM !');
        return;
    }

    $('#result').hide();

    $('table#nilai tbody tr').each(function () {
        var sks = parseInt($(this).find('.sks').val());
        var grade = $(this).find('.grade').text();

        total_sks += sks;

        if (grade == 'A') {
            total_nilai += (sks * 4);
        } else if (grade == "B+") {
            total_nilai += (sks * 3.5);
        } else if (grade == "B") {
            total_nilai += (sks * 3);
        } else if (grade == "C+") {
            total_nilai += (sks * 2.5);
        } else if (grade == "C") {
            total_nilai += (sks * 2);
        } else if (grade == "D") {
            total_nilai += (sks * 1);
        } else {
            total_nilai += (sks * 0);
        }
    });

    var ipk = total_nilai / total_sks;

    $('#loading .bar').animate({
        width: '100%'
    }, 500);
    setTimeout(function () {
        $('#result_nim').html(nim);
        $('#result_nama').html(nama);
        $('#result_sks').html(total_sks);
        $('#result_matkul').html(total_matkul);
        $('#result_ipk').html(ipk.toFixed(2));
        $('#result').fadeIn('slow');
    }, 1500);
    setTimeout(function () {
        $('#loading .bar').animate({
            width: '0%'
        }, 500);
    }, 2500);
}

function reset() {
    $('table#nilai tbody tr').remove();
    $('table#nilai tbody').append(kode);
    $('#nama, #nim').val('');
    $('#result').hide();
}

$(document).ready(function () {

    $('.container-fluid').hide().fadeIn('slow');

    $('table#nilai').delegate('.sks, .tugas, .uts, .uas', 'keydown keyup change focus', function (e) {
        var jenis = $(this).closest('tr').find('.jenis').val();
        var sks = parseInt($(this).closest('tr').find('.sks').val());
        let tugas, uts, uas;

        if (jenis == 'def1') {
            tugas = 0.3 * parseInt($(this).closest('tr').find('.tugas').val());
            uts = 0.3 * parseInt($(this).closest('tr').find('.uts').val());
            uas = 0.4 * parseInt($(this).closest('tr').find('.uas').val());
        } else if (jenis == 'def2') {
            tugas = 0.5 * parseInt($(this).closest('tr').find('.tugas').val());
            uts = 0.2 * parseInt($(this).closest('tr').find('.uts').val());
            uas = 0.3 * parseInt($(this).closest('tr').find('.uas').val());
        }

        var nilai = tugas + uts + uas;
        var grade = $(this).closest('tr').find('.grade');
        var final = $(this).closest('tr').find('.final');

        // set as final result
        final.html(nilai.toFixed(2))

        if (nilai >= 80) {
            grade.html("A");
        } else if (nilai >= 73 && nilai <= 79.99) {
            grade.html("B+");
        } else if (nilai >= 66 && nilai <= 72.99) {
            grade.html("B");
        } else if (nilai >= 58 && nilai <= 65.99) {
            grade.html("C+");
        } else if (nilai >= 51 && nilai <= 57.99) {
            grade.html("C");
        } else if (nilai >= 41 && nilai <= 50.99) {
            grade.html("D");
        } else if (nilai >= 0 && nilai <= 40.99) {
            grade.html("E");
        } else {
            grade.html("K");
        }
	}).delegate('.tombolhapus', 'click', function(){
		if (confirm('Yakin mau hapus ?')) $(this).closest('tr').slideUp('slow').remove();
		
	});

    $('.sks, .tugas, .uts, .uas, .jenis').focus(function () {
        var $this = $(this);
        $this.select();

        $this.mouseup(function () {
            $this.unbind("mouseup");
            return false;
        });
    });
});

// not for mobile
if (window.innerWidth <= 800) {
    alert("Silakan buka di laptop/pc");
    window.location.href = "https://www.google.com";
}
