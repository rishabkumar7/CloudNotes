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

[Back to table of contents](#toc)

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

[Back to table of contents](#toc)

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