import $ from 'jquery';
import Cookie from "js.cookie";
import selectric from 'selectric';
import iziToast from 'izitoast/dist/js/iziToast.min.js';

// 多选及批量相关操作
$("[data-checkboxes]").each(function() {
  var me = $(this),
    group = me.data('checkboxes'),
    role = me.data('checkbox-role');

  me.change(function() {
    var all = $('[data-checkboxes="' + group + '"]:not([data-checkbox-role="dad"])'),
      checked = $('[data-checkboxes="' + group + '"]:not([data-checkbox-role="dad"]):checked'),
      dad = $('[data-checkboxes="' + group + '"][data-checkbox-role="dad"]'),
      total = all.length,
      checked_length = checked.length;

    if (role == 'dad') {
      if (me.is(':checked')) {
        all.prop('checked', true);
      } else {
        all.prop('checked', false);
      }
    } else {
      if (checked_length >= total) {
        dad.prop('checked', true);
      } else {
        dad.prop('checked', false);
      }
    }
  });
});


$('.selectric').selectric().on('change', function() {
  var operation = $(this).val();
  var keyname = new Array();
  $('input[name="id"]:checked').each(function() {
    keyname.push($(this).data("keyname"));
  });
  if (Array.isArray(keyname) && keyname.length === 0) {
    iziToast.error({
      title: 'Error!',
      message: 'Please choose at least an item',
      position: 'topRight'
    });
  } else if (operation == "expire") {
    window.$("#batchTTL").modal('show');
  } else if (operation == "delete") {
    window.$("#batchDel").modal('show');
  }
});




$('#batch-ttl-btn').click(function() {
  var keyname = new Array();
  $('input[name="id"]:checked').each(function() {
    keyname.push($(this).data("keyname"));
  });
  var ttl = $('input[name="batchttl"]').val();
  var data = {
    'keys': keyname,
    'ttl': ttl,
  };
  $.ajax({
    method: "post",
    contentType: 'application/json',
    url: 'batchttl',
    data: JSON.stringify(data),
    success: function(data) {
      if (data.code == 0) {
        Cookie.set("toast", "Set TTL Success!");
        window.location.assign(data.data);
      } else {
        iziToast.error({
          title: 'Error!',
          message: data.error,
          position: 'topRight'
        });
      }
    }
  });
});

$('#batch-del-btn').click(function() {
  var keyname = new Array();
  $('input[name="id"]:checked').each(function() {
    keyname.push($(this).data("keyname"));
  });
  var data = {
    'keys': keyname
  };
  $.ajax({
    method: "post",
    contentType: 'application/json',
    url: 'batchdel',
    data: JSON.stringify(data),
    success: function(data) {
      if (data.code == 0) {
        Cookie.set("toast", "Delete Keys Success!");
        window.location.assign(data.data);
      } else {
        iziToast.error({
          title: 'Error!',
          message: data.error,
          position: 'topRight'
        });
      }
    }
  });
});

function flush_db(url) {
  $.ajax({
    method: "delete",
    url: url,
    success: function(data) {
      if (data.code == 0) {
        Cookie.set("toast", "Flush DB Success!");
        window.location.assign(data.data);
      } else {
        iziToast.error({
          title: 'Error!',
          message: data.error,
          position: 'topRight'
        });
      }
    }
  });
  window.$('#fire-modal-1').modal('hide');
};

// 新key
$('#new-key-btn').click(function() {
  window.$("#addKey").modal('show');
});


$('.selectgroup-input').change(function() {
  var v = $(this).val()
  switch (v) {
    case 'string':
      $('#index').hide();
      $('#value-label').hide();
      break;
    case 'list':
      $('#index').hide();
      $('#value-label').show();
      break;
    case 'hash':
      $('#index').show();
      $('#value-label').hide();
      $('#index label').text('Index');
      break;
    case 'set':
      $('#index').hide();
      $('#value-label').show();
      break;
    case 'zset':
      $('#index').show();
      $('#value-label').hide();
      $('#index label').text('Score');
      break;

  }
});

// 下拉加载更多
$('#db_more').click(function() {
  $.ajax({
    url: this.dataset.url,
    type: 'get',
    dataType: 'json',
    success: function(rs) {
      $('#db_table').append(rs.html);
      $('#db_more').attr('data-url', rs.data)
      if (rs.data == '') {
        $('#db_more').text('No more data!');
      }
    }
  })
});

window.flush_db = flush_db;