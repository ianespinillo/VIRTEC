create materialized view public.Student_info 
as select u.id,
s.file_n, 
u.email, 
ud.dni, 
ud.name, 
ud.surname, 
c.year, 
c.division
from "Student" s 
right join "User" u 
on u.id = s.user_id
right join "userDetail" ud 
on ud.user_id = u.id
right join "studentCourse" sc 
on sc.student_id = s.id 
right join "Course" c 
on c.id = sc.course_id;
create unique index on public.Student_info(id);
refresh materialized view concurrently public.Student_info
