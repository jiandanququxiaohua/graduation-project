using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

/// <summary>
/// ConvertCommon 的摘要说明
/// </summary>
public static class ConvertCommon
{
    public static List<User> ToUsers(this DataTable dt)
    {
        var result = new List<User>();
        if (dt == null || dt.Rows.Count == 0)
        {
            return result;
        }

        foreach (DataRow row in dt.Rows)
        {
            var model = new User();
            model.age = reurnSafeStr(row["age"]);
            model.userName= reurnSafeStr(row["userName"]);
            model.password = reurnSafeStr(row["password"]);
            model.alias = reurnSafeStr(row["alias"]);
            model.id = Convert.ToInt32(row["id"]);
            result.Add(model);
        }
        return result;

    }

    private static string reurnSafeStr(object obj)
    {
        if(obj==null || obj == DBNull.Value)
        {
            return string.Empty;
        }
        return obj.ToString();
    }
}