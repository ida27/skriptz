setScreenWindowTitle() {
    echo -e '\033k'$1'\033\\'
}
vimAndSetScreenTitle() {
    setScreenWindowTitle $1
    vim $1
}
alias v=vimAndSetScreenTitle
alias sc='screen -dRR'
alias ..='cd ..'
alias ...='cd ../..'
alias vi='vim'
alias rf='rm -rf'
alias py='python'
alias psy='ps aux|grep python'

alias bo='buildout'
alias bi='./bin/instance fg'
alias ibi='./instance/bin/instance fg'
alias boi='buildout; ./bin/instance fg'

alias br='git branch'
alias pull='git pull origin master'
alias push='git push origin master'
alias st='git status'
alias di='git diff'
alias ch='git checkout'
alias chb='git checkout -b'
alias chm='git checkout master'
alias rs='git reset --hard'
alias lo='git log'
alias co='git commit -m'
alias coa='git commit -am'
alias com='git commit -m "up"'
alias coma='git commit -am "up"'
alias ga='git add'
alias ash='git stash'
alias pop='git stash pop'

alias ali='cat ~/.bash_aliases'
