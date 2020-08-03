BEGIN {
    my $homedir = ( getpwuid($>) )[7];
    my @user_include;
    foreach my $path (@INC) {
        if ( -d $homedir . '/perl' . $path ) {
            push @user_include, $homedir . '/perl' . $path;
        }
    }
    unshift @INC, @user_include;
}
require("CGI.pm");
use CGI qw(:cgi-lib);
&ReadParse(*input);


#variables that will be used later.

read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
@pairs = split(/&/, $buffer);
foreach $pair(@pairs) {
   ($name, $value) = split(/=/, $pair);
   $value =~ tr/+/ /;
   $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
   $value =~ s/<\!\-\-.*\-\->//g; # get rid of SSI
   $in{$name} = $value;
   }


use POSIX;
use Math::Complex;
use CGI::Carp qw(fatalsToBrowser);

# PERL MODULE WE WILL BE USING
use Mysql;

# MySQL CONFIG VARIABLES
$host = "localhost";
$database = "statsp6_psych30";
$tablename = "terms";
$user = "statsp6_p30";
$pw = "bruinscode";

# PERL MYSQL CONNECT
$connect = Mysql->connect($host, $database, $user, $pw);

$connect->selectdb($database);

$myquery = "select cb from cb where id='19blow'";
$execute = $connect->query($myquery);
$results=@results = $execute->fetchrow();
$grp=$results[0];


print "Content-Type: text/html\n\n";

  
$txt = <<EOF;
<script Language="JavaScript">

parent.document.getElementById('groupno').value=$grp;

</script>
EOF

print $txt;

$newcb=$grp+1;
if($newcb>4){
$newcb=1;
}
$mysql="update cb set cb=$newcb where id='19blow'";
$execute = $connect->query($mysql);

print "cb was $grp and now it is $newcb";
 
 
