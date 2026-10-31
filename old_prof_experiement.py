"""
Old experiment: depends on the unavalibale ratemyprofessor python library
--> use if a verified and actual library/ API is found for ratemyprofessor website.
"""
import ratemyprofessor

# 1. Fetch NYU specifically from RateMyProfessor
nyu = ratemyprofessor.get_school_by_name("New York University")

if nyu is not None:
    print(f"Successfully locked into school: {nyu.name} (ID: {nyu.id})")
    
    # 2. Search for a professor ONLY at NYU
    prof_name = "Amos Bloomberg"  # Replace with any NYU professor name
    professor = ratemyprofessor.get_professor_by_school_and_name(nyu, prof_name)

    # 3. Print the results
    if professor is not None:
        print(f"\n--- {professor.name} ---")
        print(f"Department: {professor.department}")
        print(f"Overall Rating: {professor.rating} / 5.0")
        print(f"Difficulty: {professor.difficulty} / 5.0")
        print(f"Total Ratings: {professor.num_ratings}")
        if professor.would_take_again is not None:
            print(f"Would Take Again: {round(professor.would_take_again, 1)}%")
    else:
        print(f"Could not find professor '{prof_name}' at NYU.")
else:
    print("Could not find NYU in RateMyProfessor database.")