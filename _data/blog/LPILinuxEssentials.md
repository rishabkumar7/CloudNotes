---
template: BlogPost
path: /linux-essentials
title: 'Linux Essentials'
date: 2021-11-21T12:12:25.364Z
thumbnail: 'https://rishabincloud.s3.amazonaws.com/CloudNotes/LPILinux.png'
tags: 'Linux'
metaDescription: LPI Linux Essentials
---
# Linux essentials

## <span id="index"></span>Index
* [Package management](#package)
    + [RPM based](#rpm)
    + [Debian based: APT and dpkg](#debian)
* [Command-line basics](#cli-basics)
    + [Command-line syntax](#cli-syntax)
    + [Basic commands](#basic-commands)
    + [Command history and completion](#cmd-history)
    + [shell configuration files](#shell-config-files)
    + [Environment / shell variables](#variables)
    + [User-defined variables](#user-def-vars)
    + [Globbing](#globbing)
    + [Quoting](#quoting)
    + [Formatting commands](#formatting)
    + [Working with options](#options)
    + [Locate, find, whereis](#locate-find-whereis)
* [Getting CLI help](#cli-help)
    + [Linux MAN pages](#man-pages)
    + [Info pages](#info-pages)
    + [More local documentation](#more-local-docs)

## <span id="package"></span>Package management

### <span id="rpm"></span>RPM based

#### Yum
YUM repos are located in `/etc/yum.repos.d/`. Unlike APT, YUM has several repo files in the folder. Check out the man pages for YUM and the other package management commands.

| command | purpose |
| --- | --- |
| `yum update` | updates the repos and gives you the option of updating the packages pending updates |
| `yum search httpd` | searches for that package |
| `yum install $package` | to install it |
| `yum check-update $package` | to see if a package needs any updates |
| `yum upgrade` | upgrade package |
| `yum deplist $package` | check package’s list of dependencies |
| `yum clean packages` | will remove dependencies that were left behind but are no longer needed |
| `yum remove $package` | removes the package |
| `yum list installed` | list all installed packages |

#### RPM
| command | purpose |
| --- | --- |
| `rpm -ipv package.rpm` | `i` means install, `p` means show progress, and `v` means verbose |
| `rpm -q nano` | query the package for info (true file name) |
| `rpm -qi nano` | query the package for more info |
| `rpm -e nano` | uninstall the package |
| `rpm -qR nano` | uninstall required packages |

### <span id="debian"></span>Debian based: APT and dpkg

#### APT
Uses a sources list located in `etc/apt/sources.list`

| command | purpose |
| --- | --- |
| `apt-get update` | searches the online repos and caches the list of packages for when we do a search via... |
| `apt-cache search $package` | searches for a package in the APT cache |
| `apt-get install nginx` | install package |
| `apt-get remove nginx` | remove package |
| `apt-get remove --purge nginx` | to get rid of config files and such |
| `apt-get autoremove [$package]` | to remove unneeded packages. |
| `apt-get upgrade` | upgrades packages |
| `apt-get -f upgrade` | Imstalls dependencies that we’re flagged while attempting to install a Debian package |
| `apt-get dist-upgrade` | upgrades the kernel and distribution packages |

#### dpkg

| command | purpose |
| --- | --- |
| `dpkg -i name.deb` | Installs Debian package |
| `dpkg --get-selections` | shows all installed packages |
| `dpkg --remove $package_name` | Removes Debian package |
| `dpkg --purge $package_name` | Removes dependencies |


## <span id="cli-basics"></span>Command-line basics
Shells are command-line interpreters that accept commands that are then sent to the OS kernel for processing. See list of popular shells I saved as an img on my iPad. You can use any shell installed on the computer by typing its name on the CLI.

- An interactive shell is one in which you issue commands. A non-interactive shell is one that runs in the background.
- You can have several CLI sessions, accessible via `Alt + F1` through `Alt + F6`.
- You can `echo $SHELL`
- You can set each user’s shell and see it in /etc/password
- If using bash, You can see your command-line history in .bash_history and complete commands with `tab`
    + `history`
    + `history 20` show the last 20 commands.
    + `!20` execute command # 20
    + `!-2` execute the second-to-last command
    + `!!` execute the previous command
    + `!ssh` execute the last SSH command
    + `!?search?` execute the last command with "search" somewhere in it
    + `^original^replacement^` find latest command with `original` and replace that string with `replacement` on execution.
        * e.g.: `cat /etc/hots`, then `^hots^hosts^`

### <span id="cli-syntax"></span>Command-line syntax
Programs only run from inside folders indicated in the $PATH variable and not the working directory.

- The letters after `-` are called flags.
- `ls`:
    + `-a` = all (show hidden files)
    + `-l` = long listing (type and permissions, number of links the file has, owner, group, size in bytes, date modified)
    + `-F` = Display a slash after a directory, an asterisk after an executable,
    + `-S` = sort by file size, descending
    + `-r` = reverse the sorting to ascending. E.g., `ls -lrS`
an @ after each symbolic link.
    + `-R` = recursively display contents of directories.
    + `-t` = sort by date modified, desc

### <span id="basic-commands"></span>Basic commands

| Command | Purpose |
| :--- | :--- |
| `cd` | change directory. By itself, takes you to your home directory. |
| `env` | display current user’s environment variables |
| `halt` or `init 0` | shutdown. Note that `init` works but is deprecated |
| `ifconfig` or `ip addr` | shows NIC configs |
| `netstat` | status of the network |
| `reboot` or `init 1` | restart. Note that `init` works but is deprecated |
| `route` | view routing table |
| `shutdown` | `-H`= halt; `-P`= poweroff; `c` = cancel pending shutdown; `r` = reboot |
| `su` | substitute user or super user. E.g., `su josue` or `su -` to become root |
| `top` | list of running apps/processes; `top -h` gives usage info |
| `uname` | print OS name. `-n` = hostname; `-r` = kernel’s release; `-v` = kernel’s version number; `-m` 32- or 64-bit; `-p` = processor info; `-o` = full official name of the OS; `-a` = all info above |
| `which $program` | full path of the application |
| `whoami` | current user |

### <span id="cmd-history"></span>Command history and completion
- A user's command history is kept in **~/.bash_history**
- The `$HISTFILESIZE` env variable shows how many lines will be saved in the history file. a value of 0 means save nothing.
- The `$HISTCONTROL` env variable shows Bash's history behavior
- `history` shows a numbered list of the commands. Rerun a command with `!<num>`
- You can use the `tab` key to complete a partially-typed command

### <span id="shell-config-files"></span>shell configuration files
Different shell use different configuration files. Make sure you know which files your Linux distro uses. A system without a GUI puts you in the login shell. It’s important to know which shell your in so you know which configuration file will be used for it.

- login shell: Shell you're presented with when you log in remotely (e.g., SSH)
    + First file executed is `/etc/profile`. This file sets default variables for all users.
    + Then these files are executed in order. Once there's a match the others are ignored even if they exist:
        * `~/.bash_profile`
        * `~/.bash_login`
        * `~/.profile`
        * `~/.bashrc`
        * `/etc/bashrc`
    + `~/.bash_logout` is executed when the user logs out
- non-login shell: Shell you're presented with when you use the terminal application or when you run a script
    + Executes `~/.bashrc`, which calls `/etc/bashrc`
- bash_profile: Login shell that stores user-specific shell preferences
- bashrc: Non-login shell that stores user-specific functions and aliases
- /etc/profile: (check exact name) affects all users

### <span id="variables"></span>Environment / shell variables
- Variables are placeholders for another value. They can be used in scripts.
- User defined variables: Created by the user
- Environment variables: Created by the OS to configure the system environment. E.g., `echo $HOME`
- You can view all environment variables with `env` (not alphabetized) and `set` (alphabetized)
- Change or create a variable (note there is no space on either side of equal sign:
    + via `VAR=VALUE`. Example, `PATH=$PATH:/var/opt/`.
    + `export $PATH` to make that new value available to users in other shells
    + Configure your bash config files to make this happen every time you start your system.

#### Common environment variables

| variable | description |
| --- | --- |
| LOGNAME | username of current user |
| OLDPWD | previous working directory |
| OSTYPE | duh |
| PATH | distro dependent |
| USER and USERNAME | username of current user |
| HOST and HOSTNAME | system hostname |
| ENV | you can type `env` or `set` |
| EUID | UID number of current user |
| HISTFILE | full path of file  |
| HISTSIZE | size history can grow to |

### <span id="user-def-vars"></span>User-defined variables
- Variables cannot start with a number. They can contain `-` amd `_`
- Convention is to make variables upper-case.
- Example: `THEDUDE="Jeff Bridges" ; export THEDUDE`

### <span id="globbing"></span>Globbing
Globbing is the process of using wildcards to expand a search. Globbing stands for **global command**.

- `*` = match __0+__ of any character
- `?` = match __1__ of any character
- `[Aabc]` = match any single character in list
- `[^abc]` = exclude characters in list 
- Examples:
    + `ls -l ????.txt` search for a four-character text file
    + `ls -l [F]*.txt` search for all text files beginning with capital F
    + `ls -l f[igh][lfz]e*.txt` what you'd expect from regex, except that `*` matches anything 0+ times
    + `ls -l [Rr]eport201[0-9]`

### <span id="quoting"></span>Quoting

| Character | Description                               | Example                    |
| :---      | :---                                      | :---                       |
| `"`       | allows variable interpolation.            | `echo "The path is $PATH"` |
| `'`       | __does not__ allow variable interpolation | `echo 'The path is $PATH'` |
| `\`       | Escapes special chars                     | `echo "You owe \$5.00"`    |

### <span id="formatting"></span>Formatting commands
- Commands tend to be lower-case
- Spacing doesn't matter (2 spaces or a tab is OK)
- You can wrap long commands along several lines but will need to escape it. E.g., `ls \{enter key} -lah`

### <span id="options"></span>Working with options
- Command = what to do; options = how to do it; arguments = what to do it with.
- Parameters with a leading `-` are called __options__ and switch certain parts of the command on/off. `ls -la` = `ls -l -a`
- Paramters with no leading `-` are called arguments.

### <span id="locate-find-whereis"></span>Locate, find, whereis

#### Locate
Searches its file database for files or directories the user has access to. Faster than `find` but doesn't allow you to indicate the directory.

    locate passwd

#### Find
- Syntax is `find $dir [$dir2] {-name | -iname | -size | -mtime | -atime | -ctime}`
- You can glob using `*`, `?`, and `[]`.
    - __If you glob, you must use single quotes.__
- This command will search the directory recursively.
    + You can exclude a directory with `-or -iname "$dir_name" prune`

Examples:

    find . -iname '*keyword*'                   # Match keyword
    find / -size +1024                          # greater than size in bytes
    find . -mtime -1                            # modified time less than 1 day
    find . -atime -1                            # accessed time less than 1 day
    find . -ctime -1                            # created time less than 1 day
    find . -iname '*.txt' -or -iname "implementations" -prune

#### whereis
Searches for executables and man page files

    whereis cd


## <span id="cli-help"></span>Getting CLI help

### <span id="man-pages"></span>Linux MAN pages
- Meant as a quick reference for people who already know a command and need to learn certain options. Not meant to be a tutorial.
- Quality can vary significantly from one page to the next
- Man pages have 9 sections. You'll mostly use section 1, executable programs and shell commands. To see section 5, for example, type `man 5 $command`
- Use `whatis $command` to search for man page entries matching that command. E.g., `whatis passwd`.
- `apropos $keyword`  search man pages for entries containing the keyword.
- You can use `/` inside a man page to search forward or `?` to search backwards
- Man pages are organized like this:
    + Name
    + Synopsis: Brief description of how the command is used, incl. optional parameters (in brackets) and required paramters (underlined). `...` means multiple parameters of that type. E.g., `ls -la file1 file2`
    + Description
    + Options
    + Files
    + See Also
    + Bugs
    + History
    + Author

### <span id="info-pages"></span>Info pages
- Similar to man pages, but has hyperlinks (denoted by asterisk.
- Programs from the Free Software Foundation use info pages instead of man pages.
- `info $topic`

### <span id="more-local-docs"></span>More local documentation
- other ways to get help include an application's readme file.
- Locations for readme files include:
    + `/usr/doc/packagename`
    + `/usr/share/doc/packagename`
    + `/usr/share/doc/packages/packagename`
- Many programs have help files in PostScript, PDF, or HTML format.
- Configuration files are typically in the `/etc` directory.
- For RPM packages, try `rpm -ql passwd | grep doc` or `rpm -ql yum | grep README`

#### Reading different file formats

| file ext                | program used to read them                          |
| :---                    | :---                                               |
| `.1` - `.9`             | man, info, less                                    |
| `.gz` or `.bz2`         | gunzip or bunzip2 to decompress, then less to read |
| `.txt`                  | any text editor                                    |
| `.htm`, `.html`         | any web browser, often less                        |
| `.odt`                  | LibreOffice, OpenOffice.org, any word processor    |
| `.pdf`                  | `.xpdf`, Adobe Reader                              |
| `.tif`, `.png`., `.jpg` | Gimp  

## <span id="linux-file-system"></span>The Linux file system
The Linux file system and the file system hierarchy standard (FHS)

- The Linux file system uses a hierarchy structure to organize data.
- Linux systems have a standard set of subdirectories at the root.

| directory          | description                                                 |
| :---               | :---                                                        |
| bin                | executables necessary to run the OS                         |
| boot               | bootloader files to boot Linux                              |
| dev                | devices that send/receive data sequentially (printers/mice); devices that are block-oriented (HDs, flash drives) |
| etc                | text-based config files used by the system                  |
| home               | home folders for users                                      |
| lib -> usr/lib     | code libraries for programs in the bin or sbin directories  |
| lib64              | 64-bit libraries                                            |
| media              | used by some distros to mount external devices              |
| mnt                | used by some distros to mount other external devices        |
| opt                | contains files for programs you can install manually        |
| proc               | pseudo file system for processes                            |
| root               | root user's home directory                                  |
| sbin               | mgmt and config files                                       |
| srv                | where services save their files (e.g., httpd)               |
| sys                | hardware within system                                      |
| tmp                | temporary files created by file system                      |
| usr                | application files                                           |
| var                | Linux variable data and log files                           |

### <span id="file-system"></span>Disk file systems
- __ext2:__ second extended file system. Data is stored in hiearchical fashion (dirs/files). 2 TB is max file size.
- __ext3:__ updated version of ext2. Adds journaling, which records transactions. If the system restarts uncleanly, the entire file system doesn't need to be checked entirely as with ext2.
- __Reiser:__ similar to ext3 in that journaling makes recovery much quicker.
- __ext4:__ updated version of ext3.


## <span id="files"></span>Files and directories
- `touch -d "February 1 2017" file.txt`: Allows you to specify the modification timestamp.
- `mkdir -p newdir/newsubdir/newsubdir2`: Create a directory and its parents if they don't exist.
- `rmdir $dir`: Can only delete empty directories
- `cp -puR srcfile dstfile`:
    + __`p`__ = preserve original ownership
    + __`u`__ = update (only if src is newer or dst doesn't exist)
    + __`R`__ = recursive
- `mv srcfile directory/`: Move/rename file to indicate directory


## <span id="archives-compression"></span>Archives and compression

### <span id="archives"></span>Archives
- __tar:__ Stands for “tape archive.” Combines files but doesn’t compress them. You can pass flags to both archive and compress, since Gzip and Bzip2 are for compressing only. **Note that the order of the flags matters for `tar` command.**
    + `-c` = create archive
    + `-f` = read the archive from or write the archive to the specified file
    + `-t` = list archive's content w/o extracting it
    + `-x` = extract tarball
    + `-v` = verbose output (lists files extracted)
    + `-z` = compress using gzip
    + `-j` = compress using bzip2 (like gzip but more resources intensive)

__Archive (no compression)__

| Command                           | Notes                                         |
| :---                              | :---                                          |
| `tar -cf tarball.tar dir-to-tar`  | creates the tarball from dir-to-tar directory |
| `tar -cf tarball.tar file1 file2` | creates the tarball from files indicated      |

__Unarchive (no compression)__

| Command                 | Notes                                    |
| :---                    | :---                                     |
| `tar -tf tarball.tar`   | show contents of tarball w/o unarchiving |
| `tar -xf tarball.tar`   | extract tarball                          |
| `tar -xvf tarball.tar`  | extract tarball, verbose                 |

__Archiving with compression__

While not required, it's best practice to indicate the compression used as part of the file name.

| Command                               | Notes                 |
| :---                                  | :---                  |
| `tar -czf tarball.tar.gz dir-to-tar`  | use gzip to compress  |
| `tar -cjf tarball.tar.bz2 dir-to-tar` | use bzip2 to compress |

__Unarchiving compressed tarballs__

| Command                 | Notes                                      |
| :---                    | :---                                       |
| `tar -xzf tarball.tar.gz`   | extract compressed gzipped archive |
| `tar -xjvf tarball.tar.bz2`   | extract compressed bzip2 archive, verbose |


### <span id="compression"></span>Compression
- __zip:__ Like in Windows. It's the only command that both compresses and archives. It's also the simplest b/c it has few options.
    + Examples: Compress with `zip` and extract with `unzip`
        * `zip file.zip file1 [file2]` = create a zipped archive of the specified files
        * `zip -r file.zip dir-to-zip`
            - `-r` is required to go into directories and zip their contents, or else you'll zip an empty directory
        * `unzip file.zip`
- __gzip:__ Compressed file format. Not for archiving, but for compressing.
    + Compress with `gzip` and extract with `gunzip`.
    + File extension is __.gz__.
    + __Note:__ Gzip deletes the original unless you pass the `-c` flag, or the `-k` flag for "keep."
    + Examples:
        * `gzip file.tar` = will replace original file
        * `gzip -c file.tar > file.tar.gz` = will keep original file and create file.tar.gz
        * `gzip -k file.tar` = same as above
        * `gunzip file.tar.gz` = uncompress file
- __bzip2:__ Better than Gzip, especially for bigger files. Not for archiving, but for compressing.
    + Compress with `bzip2` and extract with `bunzip`. File extension is __.bz2__
    + Examples:
        * `bzip2 file.tar`
        * `bunzip2 file.tar.bz2`


## <span id="searching"></span>Searching for and extracting data from files

### <span id="viewing-text"></span>Viewing text

| Command    | Purpose |
| :---       | :---     |
| `cat`      | display contents of a file |
| `less -M`  | reads file with pagination. <br><br>use `/` to search fwd and `?` to search backwards<br><br> `-M` shows lines you're reading and total, plus percentage <br><br>`-N` shows line numbers on the left <br><br> `G` goes to beginning and `shift` + `G` goes to end |
| `head`     | read first 10 lines of a file. `-n $num_lines` |
| `tail`     | read last 10 lines of a file; `-f` = follow |
| `find`     | locates file on system<br><br>`find . -type d` find directories<br>`find . -type f` find files<br>`find . -iname "file*.` allows globbing |

### <span id="analyzing-text"></span>Analyzing text
- `grep`: searches for a string; allows globbing<br>
    + `-r` = recursive
    + `-i` = case insensitive
    + `-n` = show line numbers
    + `-w` = expression is searched for as word
    + Examples:
        * `grep ^Sirloin file1.txt`
        * `grep -i dhcp /var/log/messages`
        * `grep -n dhcp /var/log/messages`
        * `grep -rnw '.' -e 'domo'` searches all files in the current folder for the expression
- `sort`: sorts text alphabetically
    + `-r` = reverse alphabetically
- `cut`: Remove text from file and print specified fields to stdout
    + `-d` = delimiter. E.g., `-d" "` = space character as the delimiter
    + `-f` = which field to print (based on the delimiter)
    + Examples:
        * `cut -d" " -f 6-` = start from field 6 through EOL
- `wc`: word count. Note that you can specify multiple files.
    + `-w` = words
    + `-l` = lines
    + `-c` = chars

### <span id="pipes"></span>Pipes and regular expressions
You can pipe the output of one command as the input for another command:

    grep -i republic plato_republic.txt | less
    grep -i republic plato_republic.txt | wc -w

#### Regular expressions for `grep` command

| Expression     | Description                                       | Example            |
| :---           | :---                                              | :---               |
| *              | 0+ repeats of preceding character string or regex | `file*`            |
| .              | any single char (grep)                            | `.cc`              |
| ?              | 0+ of proceeding chars                            | `f?le`             |
| ^              | appears at beginning                              | `^.b`              |
| $              | appears at end                                    | `^...$` 3 chars    |
| `\b<needle>\b` | word boundary (must match exactly)                | `\bwww\b`          |
| [nnn]          | one char btw braces                               | `[abc]`            |
| [^nnn]         | no chars btw braces                               | `[^abc]`           |
| [a-z]          | any single char in range                          | `[a-x]`            |
| [1-90]         | any digit between 1-9, and 0                      | ``                 |

### <span id="redirection"></span>I/O Redirection

#### Redirecting output
Output is normally displayed on the screen but can be redirected to files or to other commands as input.

    tail /var/log/messages > logtemp.txt    # redirect stdout
    tail /var/log/messages 1> logtemp.txt   # same as above
    tail /var/log/messages >> logtemp.txt   # append

    cat bogusfile.txt 2> errors.txt         # redirect stderr
    cat bogusfile.txt 2>> errors.txt        # append

    command 1> outfile.txt 2> errfile.txt   # redirect to separate files


## <span id="scripting"></span>Turning commands into a script

### <span id="text-editing"></span>Basic text editing

#### nano
- `ctrl` + `k`: cut line
- `ctrl` + `u`: paste line
- `ctrl` + `w`: search for text
- `ctrl` + `t`: spell check
- `ctrl` + `\`: find and replace
- `ctrl` + `g`: view help
- `ctrl` + `x`: exit

#### vim
- `vimtutor` = built in tutorial from beginner to advanced
- Insert mode via `i`, `INSERT`, `s`, `o`, `a`
- There are command mode adn command line mode. Enter command line mode from command mode via `:`
    + `v` = enter visual mode. `V` = highlights the line; `ctrl` + `V` = visual block
        * `y` = "yank" or copy highlighted text
    + `p` = "put" or paste text
    + `shift` + `a` = append text at end of line
    + `u` = undo last change
    + `h` = move left
    + `j` = move down
    + `k` = move up
    + `l` = move right
    + `dw` = delete word under cursor
    + `dd` = deline line under cursor (5dd = delete 5 lines)
    + `shift` + `g` = go to bottom of file
    + `gg` = go to top of file
    + `:w` = write to disk
    + `:wq` or `x` = write to file and quit
    + `q!` = quit without saving

### <span id="shell-scripting"></span>Shell scripting
- `#!/bin/bash` = specify an interpreter, (called the shebang)
- __Arguments:__ $1 -> first arg, $2 -> second arg, $? -> exit code/status
- __`&&`:__ execute command 2 only if command 1 exits normally
- __`||`:__ execute command 2 only if command 1 exits abnormally
- You can combine `&&` and `||` as such:<br>`rm file1.txt && echo "file deleted" || echo "file not deleted"`
- When scripts are first created, they are not executable. Fix this with `chmod +x <file name>`

#### Basic if statement

    if [ condition ]
    then
        command
    fi


    # example

    if ["1" == "1"]
    then
        echo "They are the same"
    fi

#### Basic else statement

    if [ condition ]
    then
        command
    else
        command
    fi


    # example

    if [ "$PWD" == "$HOME" ]
    then
        echo "You are home."
    else
        echo "You are in $PWD."

#### Loops

    for i in {1..10}
    do
        echo "$i"
    done

#### Example bash script 1

```bash
#!/bin/bash

# My daily routine script

# If user enters "day", show calendar and date
SHOWDAY=$1

if [ "$1" == "day" ]
then
    # Display the calendar
    cal

    # Display the date/time in UTC
    date -u
fi

# Daily greeting
printf "\nHello there, $LOGNAME.\n\n"

if [ "$PWD" == "$HOME" ]
then
    echo "You are home."
else
    printf "You are in $PWD.\n\n"
fi

# Show us what we have to work on today
DOCUMENTS="/Users/rkumar/Downloads/linux-essentials-practice/text-analysis"

for doc in "$DOCUMENTS"/*.txt
do
    echo "$doc"
done
```

#### Example bash script 2
Create the script to set variable values based on args

```bash
#! /bin/bash
# list contents of a dir and write the output to a file
# usage: ./findlist.sh $LOCATION $FILENAME

LOCATION=$1
FILENAME=$2

if [ -z "$LOCATION" ]
then
    echo "Please provide location argument"
    exit 0
fi

if [ -z "$FILENAME" ]
then
    echo "Please provide a filename"
    exit 0
fi

ls -lh  $LOCATION > $FILENAME
echo
echo "Script is complete and indexed $LOCATION."
echo
echo "###########################"
echo "Displaying contents of $FILENAME"
echo "###########################"
cat $FILENAME
```


## <span id="linux-os"></span>The Linux operating system

### <span id="linux-diffs"></span> Windows, Mac, and Linux differences
- Windows has a lot of proprietary software and active directory.
- Apple uses proprietary hardware and software
- It's now easier to switch to Linux b/c many applications are web based.
- CLI: Windows has PowerShell and macOS doesn't have a CLI-only mode

### <span id="linux-lifecycle"></span> Linux lifecycle management
- Design
- Develop
- Deploy
- Manage
- Retire

## <span id="hardware"></span> Understanding computer hardware

| Command             | Purpose                                                                |
| :---                | :---                                                                   |
| `cat /proc/cpuinfo` | view processor details                                                 |
| `free`              | view RAM stats in bytes<br><br>`-m` = show in MB<br> `-g` = show in GB |
| `dmidecode`         | show details about motherboard, BIOS, processor, and RAM               |
| `lsblk`             | view all block devices (e.g., HDD) attached to system                  |
| `df`                | view free disk space on HDD<br><br> `-h` = human readable format       |
| `du -h $path`       | disk usage; human redable, directories only <br><br>`-a` = show files  |
| `top`               | show stats on processor, RAM, and running processes                    |

* Hard drives tend to be named sequentially, such as `/dev/sda`, `/dev/sdb`, etc.
* Partitions are named sequentially, so partitions on sda will be called `sda1`, `sda2`, etc.

## <span id="data"></span>Where data is stored

### <span id="kernel"></span>The kernel
- Core of any Linux installation.
- Responsible for managing every piece of softare on a Linux computer, interfacing with the hardware.
- The kernel launches __/sbin/init__, and init in turn launches child processes.
- Linux manages these processes in the processes table, which we can access via __ps__ and __top__.

### <span id="processes"></span>Linux processes
- Every process has a __PID__.
- Every parent process has  parent ID (__PPID__)
    + The two parent processes are 1) systemd and 2) kthreadd
- The kernel supplies process information to the __`/proc`__ directory so it can be available to the `ps`, `top`, and `free` commands.
- We can use `ps` to identify running processes. Note that this command provides a static snapshot.
    + `-u $username` shows processes for that username
    + `-e` shows every process running from all users
    + `-H` show hierarchy of processes via indented output. E.g., `ps -eH`
    + `--forest` also shows process hierarchy. E.g., `ps -e --forest`
    + `-f` shows full format listing (all arguments a command is using while running). E.g., `ps -ef --forest`
    + `ps -u josue --forest` shows parent/child relationships for processes.
    + `ps u U josue` gives CPU and memory %.
    + `ps aux` the `u` adds the username column. There's so much output it's typically more practical to grep.
    + `kill -9 $PID` will kill a process
- `top` is dynamic, as opposed to `ps`, which provides a static snapshot.
    + `-h` or `?` will display CLI usage info and exit
    + After running `top`...
        * `k` will prompt for the PID of the process to kill.
        * `M` sort by memory usage
        * `P` sort by CPU usage (default)
- `free` generates a report on the system's memory status using __KB__
    + The __Mem:__ line shows total RAM stats
    + The __-/+ buffers__ line shows the total memory used by the programs
    + __Swap:__ is hard disk space used as a adjunct to RAM.
    + The `-h` flag shows the information in human-readable measurements (MB, GB)

### <span id="syslog"></span>syslog, klog, dmesg
- Most system logs are stored in __/var/log/__
- Logs are closed daily and retained for several days
- Reading most system log files requires root privileges
- __boot.log__ records events from when the system boots
- __messages__ is the main log file
- __secure__ is the file that logs when users elevate their privileges or attempt/fail to log in
- `grep sshd /var/log/*`
- __klogd__ manages messages from the kernel separate from other programs.
- `dmesg` will display messages from the kernel. This helps with tshoot of hardware or driver issues.


## <span id="networking"></span>Networking

### <span id="basic-networking"></span>Basic networking

#### Important network tools

| Tool             | Purpose                                 |
| ---              | ---                                     |
| `ping -c $num `  | testing connectivity                    |
| `dig`            | `dig www.pluralsight.com -t A`          |
| `nslookup`       | `nslookup -query=A www.pluralsight.com` |
| `netstat`        | list network connections                |
| `route`          | current route/netwk settings            |
| `host $fqdn`    | test DNS resolution                     |
| `traceroute`     | trace packet route                      |
| `ifconfig`       | current network settings                |
| `ip addr [show]` | current IP addr and network settings    | 

- You set up DNS information in __/etc/resolv.conf__, but in some distros you're not supposed to edit this file.
- You can see CentOS network config in __/etc/sysconfig/network-scripts/ifcfg-ens33__ or some other __ifcfg...__ file.

#### Static IP address
- Edit __/etc/sysconfig/network-scripts/ifcfg-ens33__
    + BOOTPROTO="static"
    + `IPADDR="$addr"``
    + `NETMASK="$mask"``
    + `NETWORK="$subnet_id"``
    + You can use CIDR notation on the IP address and omit the `NETMASK`
    + Remember to set DNS information in __/etc/resolv.conf__
    + You add routes another way

### <span id="routes"></span>Routes
- `ip route show` shows the routes
- `route` older method of showing routes
- `netstat -r` same output as the `route` command, including routes to leave the LAN
- Always set your destination gateways as IP addresses, not FQDNs.
- Add routes via `route add -net $ntwk_id netmask $mask gw $rtr_addr`
- Remove routes via `route del -net $ntwk_id netmask $mask gw $rtr_addr`
- `Route add default gw $ip_addr`
- The DNS server used is indicated in __/etc/resolv.conf__

### <span id="other"></span>Other commands

| Command | Description |
| --- | --- |
| `netstat -a` | Lists listening & non-listening sockets |
| `netstat -i` | Stats about the network interfaces |
| `netstat -l` | Lists listening sockets |
| `netstat -s` | Summary for each protocol |
| `netstat -r` | Equivalent to `route` |


## <span id="security"></span>Basic security and user types

### <span id="root-std-users"></span>Root and standard users
- Only the user and root can access the user's files.
- `finger $username` gives info on a user (login, directory, name, and shell)
- `id $username` gives user ID, group ID, group memberships
- __/etc/passwd__ has list of users who can authenticate locally. Each line indicates the user, the user's pw (legacy field), UID, GID for default group, full name or comment, home dir, and default shell
- __/etc/shadow__ has list of user passwords. Each line has the username, hashed pw, last modified field in Unix epoch, max days before a password must be changed, days ahead of max when the user will be prompted to change the password, the days to wait to disable the account if the password remains expired, and the expired field.
- __/etc/sudoers__ has a list of sudoers
- __/etc/group__ shows the group, password for the group, GID, and list of users who are members
- `pwck` checks whether passwd and shadow are in sync.
- `pwconv` adds any missing users from etc to shadow.
- Root exists to perform administrative tasks and can therefore access all files.
- `su` or `su -` let’s you become Root. `su - username` gives us a shell as that user, with their PATH var.
- `sudo $cmd` is a per-command way to elevate privileges.
- `who` = who is logged in
- `W` shows logged in users and their processes.
- `who -b` last boot time
- `who -m` whostname and user associated with it
- `who -r` our current run level
- `who -q` number of users logged in
- `who -a` all of the above
- `last [$username]` who logged in, when, and how, in reverse chronological order


## <span id="users-groups"></span>Creating users and groups
- Every user acct has a UID and a textual username.
- Different users could have the same UID and therefore identical rights to the same files. You should never do this.
- `id` will show the current user’s UID and GID. You can also type `id $username`
- `groups $username` shows the group memberships.
- `groupadd <grp-name>` = add a new group
- `useradd [-G $GID] -m -c "John Doe" jdoe` = add a new user. This command pulls defaults from __/etc/default/useradd__
    + `-m` = create home dir
    + `-c` = comment; usually the user's full name
- `userdel -r jdoe` = delete user and home folder
- `sudo passwd $username` = change user's password.


## <span id="permissions-ownership"></span> Managing file permissions and ownership

### <span id="permissions"></span> File and directory permissions

```bash
☁  shell-scripting  ll
total 24
drwxr-xr-x  5 rkumar  staff   160B May 21 16:22 ./
drwxr-xr-x  5 rkumar  staff   160B May 21 08:48 ../
-rwxr-xr-x  1 rkumar  staff   546B May 21 16:17 daily.sh*
-rwxr-xr-x  1 rkumar  staff   516B May 21 16:22 indexer.sh*
-rw-r--r--  1 rkumar  staff   1.8K May 21 16:22 test1.txt
```

- In the output above, the columns on the left indicate the user, group, and global permissions.
- Permissions can be shown via symbolic (the letters above) or octal notation.
    + `r` = 4
    + `w` = 2
    + `x` = 1
    + e.g., daily.sh has octal values 755

### <span id="modifying-permissions"></span> Modifying permissions
- `chmod` = change mode of a file or directory, affecting permissions
    + `chmod u=rwx,g=rw,o=r $file_name`
    + `chmod o-rx daily.sh` = remove read and execute permissions from others
    + `chmod -R o-rx shell-scripting/*` = recursively alter permissions for files in a directory, but not the directory itself
        * Applying the command to the directory instead of including `/*` also alters the directory.
    + `chmod 600 test1.txt` = modify permissions on the file with rw permissions for the user and no permissions for the group or others
- `chown $file_or_dir` = change ownership of a file/directory
    + `chown $username:$group $file`
        * You can omit the colon and the group if you're only changing the user. `chown $username $file`
        * You can omit the user if you're changing the group membership: `chown :$group $file`
        * Only root can change the user who owns a file
- `chgrp` = change group ownership of a file/directory


## <span id="special"></span>Special directories and files

### <span id="symlinks"></span> Symbolic links
- Symlinks are similar to windows shortcuts. They reference the path to a file, not the file itself.
- If the original file/dir is moved, the symlink breaks.
- `ln -s $src_name $link_name` one convention is to append `.lnk` to the end of the symlink name
- `unlink $link_name` removes the symlink
- Symlinks display an __l__ in the file descriptor column of the `ls -l` output.
- Hard links are another pointer to the exact data on the hard disk. Deleting only one doesn't delete the file.
    + `ln $src_file $link_name`

### <span id="special-files-dirs"></span> Special files and directories, and the sticky bit
- __/var/tmp:__ Has temp files that do __not__ get deleted on reboot
- __/tmp:__ Has files that get deleted upon reboot
    + Files in this directory have the sticky bit set, meaning that only users who created a file can delete that file even if everything has rwx permissions for this directory. This cam be seen via `ls -ld /tmp`, which gives `drwxrwxrwt. 8 root root 211 May 23 18:22 /tmp`
- There are two ways to apply the sticky bit to a directory:
    + `chmod o+t $dir_name`
    + `chmod 1777 $dir_name` the `1` denotes the sticky bit. To remove it, use `chmod 777 $dir_name`, where the absence of the `1` implies a zero (`chmod 0777 $dir_name`)