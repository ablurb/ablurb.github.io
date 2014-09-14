function strip_tags(input, allowed)
{
  allowed = (((allowed || '') + '')
    .toLowerCase()
    .match(/<[a-z][a-z0-9]*>/g) || [])
    .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '')
    .replace(tags, function($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

function nl2br(str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

  return (str + '')
    .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}


function updateResult()
{
	input = $('#input').val();

	input = nl2br(input);
	input = strip_tags(input, '<b><br><em><font><h1><h2><h3><h4><h5><h6><hr><i><li><ol><p><pre><s><strike><strong><sub><sup><u><ul>');

	$('#output').html(input);
	localStorage.setItem('abp_blurb', input);
}

$(document).ready(function() {
	$('#input').val(localStorage.getItem('abp_blurb'));
	updateResult();
	$('#input').keyup(function() { updateResult(); });
});