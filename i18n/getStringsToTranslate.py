# !/usr/bin/python

# Get strings between '' or ""
# Handle triplequotes

import os

wanted_file_types = ['.py', '.cpy', '.vpy']
exclude_files = ['setup.py']
exclude_words = ['', # no empty strs\
'pkg_resources'] # in first __init__.py
IN_WORD = False
delimiters = ['"', "'"]
delimiter = ''
word = ''
words = []
preceding_line = ''
END_TRIP = False
START_TRIP = False
KLASS = False
EXCLUDE = False
UNICODE = False
ROUNDBRACKET = False

# Walk recursively through directory:
for root, dirs, files in os.walk("."):
    # For each file:
    for file_name in files:
        file_path = os.path.join(root, file_name)
        if file_name.endswith('py') and not file_name in exclude_files:
            with open(file_path) as fil:
                line = fil.readline()
                while(line):

                    for i in range(len(line)):
                        char = line[i]

                        # FOUND DELI:
                        if char in delimiters:

                            if IN_WORD:
                                
                                if char == delimiter:
                                    IN_WORD = False
                                    
                                    # Triple quotes?
                                    if len(line) > i+1:
                                        if line[i+1] == delimiter:
                                            if len(line) > i+2:
                                                if line[i+2] == delimiter:
                                                    END_TRIP = True
                                                else: END_TRIP = False

                                    #word = ' '.join(word.split()) # remove superfluous space

                                    if KLASS: 
                                        if word not in exclude_words:
                                            word = 'KLASS: ' + word
                                            exclude_words.append(word)
                                    
                                    if word not in exclude_words and not EXCLUDE:
                                        
                                        words.append(word)
                                    if EXCLUDE: EXCLUDE = False                       
                                    word = ''
                                
                                # Collect chars in word:
                                else:
                                    word += char
                            
                            else:
                                IN_WORD = True
                                delimiter = char
                                
                                # WORD STARTS: 
                            
                                # Triple quotes?
                                if len(line) > i+1:
                                    if line[i+1] == delimiter:
                                        if len(line) > i+2:
                                            if line[i+2] == delimiter:
                                                START_TRIP = True
                                            else: START_TRIP = False
                                
                                # Preceding char:
                                if i-1 >= 0:
                                    # Preceding square-bracket?
                                    if line[i-1] == '[':
                                        EXCLUDE = True
                                    # Preceding unicode-decla?
                                    elif line[i-1] == 'u':
                                        UNICODE = True
                                    # Preceding round bracket?
                                    elif line[i-1] == '(':
                                        ROUNDBRACKET = True
                                    # Pre-preceding char:
                                    if i-2 >= 0:
                                        # i18n-hook?
                                        if line[i-2] == '_':
                                            print line

                        # NO DELI, collect char, if IN_WORD:
                        elif IN_WORD:
                            word += char
                    
                    if line.startswith('class'):
                        KLASS = True
                    else:
                        KLASS = False


                        preceding_line = line
                    line = fil.readline()
###################################################
            for word in words:
#                print ':'+word+':'
                pass
            #print len(words)
#            print file_path
            #print exclude_words
            exit()
###################################################
