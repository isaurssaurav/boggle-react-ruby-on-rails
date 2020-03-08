module Api::V1::GameHelper

    # Each cube in board is describe using string of 6 letters. Rules to choose cube's letter was done from site :
    # https://stanford.edu/class/archive/cs/cs106x/cs106x.1132/handouts/17-Assignment-3-Boggle.pdf (page no.2)
    
    CUBES =  [
        "AAEEGN", "ABBJOO", "ACHOPS", "AFFKPS",
        "AOOTTW", "CIMOTU", "DEILRX", "DELRVY",
        "DISTTY", "EEGHNW", "EEINSU", "EHRTVW",
        "EIOSST", "ELRTTY", "HIMNQU", "HLNNRZ"
    ]

    DIRECTIONS = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 0], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ]

    BOARD_ROWS = 4
    
    BOARD_COLUMNS = 4

    # in seconds
    GAME_TIME= 120

    def initialize_game
        {
            directions:DIRECTIONS,
            time:GAME_TIME
        }
    end

    def initialize_board
        # Initilaize 2D array 
        board =  Array.new(BOARD_ROWS){Array.new(BOARD_COLUMNS)}
        shuffled_cubes = shuffle_cubes(CUBES.dup)
        BOARD_ROWS.times do |i|
            BOARD_COLUMNS.times do |j|
                cube = shuffled_cubes.shift()
                face = randomly_select_face_from_cube(cube)
                board[i][j] = face
            end
        end
        board
    end

    def rotate_board(board)
        # How is board rotating ? 
        board.transpose.map(&:reverse)
    end

    def submit_word(board,word)
        if validate_word_and_its_postiton(board,word) == false
            return {
                status:"ERROR",
                message:"oops! cannot validate word and its position with board"
            }      
        end
          
        url = 'https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/' + word + '?fields=pronunciations&strictMatch=false'
        request = HTTParty.get(url, headers: {
            app_id: 'd49e7b28',
            app_key: '97f0dc054db34a9357ff257957520cc4'
          })
        request.success? ? {
            status:"SUCCESS"
        } :  {
            status:"ERROR",
            message:"😢 "+ word +' is not a valid word'
        }
    end
    
    def validate_word_and_its_postiton(board,word)
        board.each.with_index do |row,ri|
            @response
            row.each.with_index do |col,ci|
              @response = searchWord(board,word,[ri,ci]);
              if @response == true
                return @response
              end
            end
          end
        return false
    end
    
    private


    def searchWord(board,word,position,visited=[],str='')
        visited << position;
        x,y =position
        str = str + board[x][y];

        if str == word
            return true
        end

        if word.start_with?(str)
            all_possible_pos = find_all_possible_pos(position,visited)
            all_possible_pos.each do |pos|
            response = searchWord(board,word,pos,visited,str);
                if response == true
                    return true
                end
            end
        end 

        visited.pop
        str.chop
        return false
    end

    def find_all_possible_pos(current_position,visited)
        x,y = current_position;
        new_positions =[
            [x-1, y-1], [x-1, y], [x-1,y+ 1],
            [x, y-1],               [x, y+1],
            [x+1, y-1], [x+1, y], [x+1, y+1]    
        ]
        new_positions.select {|pos| 
            x,y = pos
            if x < BOARD_ROWS && y < BOARD_COLUMNS && x >= 0 && y >= 0 && is_visited(pos,visited) <= 0
                true
            end
        }
    end

    def is_visited(pos,visited)
        x,y = pos
        visited.select{|v_pos| v_pos[0] == x && v_pos[1] == y}.length()
    end


    # shuffle elements in array
    def shuffle_cubes(cubes)
        cubes.length.times do | i |
            new_position = rand(i+1)
            temp = cubes[i]
            cubes[i] = cubes[new_position]
            cubes[new_position] = temp
        end
        cubes
    end
    # select random element from array
    def randomly_select_face_from_cube(cube)
        random_index = rand(cube.length())
        cube[random_index]
    end
    
    # Old way -> when frontend passed word with positions
    # check if the second_position is a possible direction/position to the first postion
    # def validate_two_positions(f_posiiton,s_position)
    #     is_valid_position = false
    #     DIRECTIONS.length.times do |i|
    #         canBeVisitedRow = DIRECTIONS[i][0] + f_posiiton[0]
    #         canBeVisitedCol = DIRECTIONS[i][1] + f_posiiton[1]
    #         if canBeVisitedRow == s_position[0] && canBeVisitedCol == s_position[1]
    #             is_valid_position =true
    #             break
    #         end
    #     end
    #     is_valid_position
    # end

    # ckeck if sent words are valid i.e if words with their positons are in board
    # def validate_word_in_word(board,word,word_positions)
    #     is_valid = true
    #     word_positions.each_with_index {  |position, indx|
    #         if board[position[0]][position[1]] != word[indx]
    #             is_valid = false
    #             break
    #         end
    #     }
    #     is_valid
    # end
    
    # def validate_word_position(board,word,positions)
    #     is_valid =true
    #     k = positions.length - 1

    #     #validate requested word in bord and their postion
    #     if validate_word_in_word(board,word,positions) == false
    #         is_valid = false
    #         return is_valid
    #     end

    #     # validate if postions are possible postion to one another
    #     k.times do |i|
    #         is_position_valid = validate_two_positions(positions[i],positions[i+1])
    #         if is_position_valid == false
    #             is_valid = false
    #             break
    #         end
    #     end
    #     is_valid
    # end

end