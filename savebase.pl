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


print "Content-Type: text/html\n\n";

$cond1=$input{'cond1'};
$cond2=$input{'cond2'};
$cond3=$input{'cond3'};
$cond4=$input{'cond4'};
$var1=$input{'data1'};
$var2=$input{'data2'};
$var3=$input{'data3'};
$var4=$input{'data4'};
$cb=$input{'cb'};

$myquery="insert into 19blow values('$cond1','$cond2','$cond3','$cond4','','','','','$cb','')";
$execute = $connect->query($myquery);



print "$myquery";
