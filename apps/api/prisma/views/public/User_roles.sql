create materialized view public.User_roles as
select u.id,
    u.email,
    r.id as rol_id,
    r."name" as rol_name,
    s.id as school_id,
    s."name" as school_name
from "User" u
    inner join "userDetail" ud on ud.user_id = u.id
    inner join "userRole" ur on ur.user_id = u.id
    inner join "Roles" r on r.id = ur.rol_id
    inner join "School" s on s.id = u.school_id
WHERE u."deleted_at" IS null;
CREATE UNIQUE INDEX idx_User_roles ON public.User_roles (id);
REFRESH MATERIALIZED VIEW CONCURRENTLY public.User_roles
